import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const days = Number(process.env.CONTACT_DATA_RETENTION_DAYS);
  const enabled = Number.isInteger(days) && days >= 1 && days <= 730;
  return NextResponse.json({ enabled, ...(enabled ? { retentionDays: days } : {}) }, {
    headers: { "Cache-Control": "no-store" },
  });
}
