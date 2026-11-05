import { createHmac } from "node:crypto";
import type { PoolClient } from "pg";
import { NextResponse } from "next/server";
import { verifySameOrigin } from "@/lib/auth";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactInput = {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
};

function parseContactInput(value: unknown): ContactInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (typeof input.website === "string" && input.website.trim()) return null;
  if (
    typeof input.name !== "string" || input.name.trim().length < 2 || input.name.trim().length > 120
    || typeof input.email !== "string" || input.email.trim().length > 254
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())
    || typeof input.subject !== "string" || input.subject.trim().length < 3 || input.subject.trim().length > 160
    || typeof input.message !== "string" || input.message.trim().length < 10 || input.message.trim().length > 5000
    || (input.phone !== undefined && input.phone !== null && (typeof input.phone !== "string" || input.phone.length > 32))
    || input.consent !== true
  ) return null;
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: typeof input.phone === "string" && input.phone.trim() ? input.phone.trim() : null,
    subject: input.subject.trim(),
    message: input.message.trim(),
  };
}

function retentionDays(): number | null {
  const value = Number(process.env.CONTACT_DATA_RETENTION_DAYS);
  return Number.isInteger(value) && value >= 1 && value <= 730 ? value : null;
}

function contactRateKey(email: string): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) throw new Error("SESSION_SECRET must contain at least 32 bytes.");
  return createHmac("sha256", secret).update(`contact:${email}`).digest("hex");
}

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  const input = parseContactInput(body);
  if (!input) return NextResponse.json({ error: "Check the form fields and consent before submitting." }, { status: 400 });
  const days = retentionDays();
  if (days === null) {
    return NextResponse.json({ error: "Enquiry submissions are not enabled until a retention period is configured." }, { status: 503 });
  }

  let client: PoolClient | null = null;
  try {
    const transaction = await getDatabasePool().connect();
    client = transaction;
    await transaction.query("BEGIN");
    const rate = await transaction.query(
      `INSERT INTO contact_rate_limits (bucket_key, window_started_at, submission_count)
       VALUES ($1, now(), 1)
       ON CONFLICT (bucket_key) DO UPDATE SET
         submission_count = CASE
           WHEN contact_rate_limits.window_started_at <= now() - interval '1 hour' THEN 1
           ELSE contact_rate_limits.submission_count + 1
         END,
         window_started_at = CASE
           WHEN contact_rate_limits.window_started_at <= now() - interval '1 hour' THEN now()
           ELSE contact_rate_limits.window_started_at
         END
       RETURNING submission_count`,
      [contactRateKey(input.email)],
    );
    if (rate.rows[0].submission_count > 5) {
      await transaction.query("ROLLBACK");
      return NextResponse.json({ error: "Too many enquiries from this email address. Try again later." }, { status: 429 });
    }

    await transaction.query("DELETE FROM contact_submissions WHERE expires_at <= now()");
    await transaction.query("DELETE FROM contact_rate_limits WHERE window_started_at <= now() - interval '1 day'");
    const inserted = await transaction.query(
      `INSERT INTO contact_submissions
        (name, email, phone, subject, message, privacy_consent_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, now(), now() + ($6::integer * interval '1 day'))
       RETURNING id`,
      [input.name, input.email, input.phone, input.subject, input.message, days],
    );
    await transaction.query("COMMIT");
    return NextResponse.json({
      received: true,
      reference: inserted.rows[0].id,
      message: "Your enquiry has been stored for staff review. No email was sent.",
    }, { status: 201 });
  } catch (error) {
    if (client) await client.query("ROLLBACK").catch((rollbackError: unknown) => {
      console.error("Contact enquiry rollback failed:", rollbackError);
    });
    console.error("Contact enquiry submission failed:", error);
    return NextResponse.json({ error: "Your enquiry could not be stored. Please try again later." }, { status: 503 });
  } finally {
    client?.release();
  }
}
