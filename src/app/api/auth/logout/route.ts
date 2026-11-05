import { NextResponse } from "next/server";
import { destroySession, verifySameOrigin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    await destroySession();
    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error("Admin logout failed:", error);
    return NextResponse.json({ error: "Sign-out is temporarily unavailable." }, { status: 503 });
  }
}
