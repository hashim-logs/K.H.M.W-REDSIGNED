import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    return NextResponse.json({ authenticated: Boolean(session), user: session });
  } catch (error) {
    console.error("Admin session lookup failed:", error);
    return NextResponse.json({ error: "Session lookup is temporarily unavailable." }, { status: 503 });
  }
}
