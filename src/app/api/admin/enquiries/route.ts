import { NextResponse } from "next/server";
import { getAdminSession, verifySameOrigin } from "@/lib/auth";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
    }
    await getDatabasePool().query("DELETE FROM contact_submissions WHERE expires_at <= now()");
    const result = await getDatabasePool().query(
      `SELECT id, name, email, phone, subject, message, created_at AS "createdAt",
              reviewed_at AS "reviewedAt", expires_at AS "expiresAt"
       FROM contact_submissions
       ORDER BY created_at DESC
       LIMIT 500`,
    );
    return NextResponse.json({ enquiries: result.rows });
  } catch (error) {
    console.error("Admin enquiry list failed:", error);
    return NextResponse.json({ error: "Enquiries could not be loaded." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
    }
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) {
      return NextResponse.json({ error: "A valid enquiry ID is required." }, { status: 400 });
    }
    const result = await getDatabasePool().query(
      "UPDATE contact_submissions SET reviewed_at = now(), reviewed_by = $2 WHERE id = $1 RETURNING id",
      [body.id, session.id],
    );
    if (!result.rowCount) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    return NextResponse.json({ reviewed: true });
  } catch (error) {
    console.error("Admin enquiry review update failed:", error);
    return NextResponse.json({ error: "Enquiry could not be updated." }, { status: 503 });
  }
}
