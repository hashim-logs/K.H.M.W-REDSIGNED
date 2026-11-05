import { NextResponse } from "next/server";
import {
  clearLoginAttempts,
  createSession,
  hasTooManyLoginAttempts,
  isAdminRole,
  recordFailedLogin,
  verifyPassword,
  verifySameOrigin,
} from "@/lib/auth";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "A valid JSON request is required." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "A valid email and password are required." }, { status: 400 });
  }
  const { email, password } = body as Record<string, unknown>;
  if (typeof email !== "string" || typeof password !== "string" || password.length > 1024) {
    return NextResponse.json({ error: "A valid email and password are required." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  try {
    if (await hasTooManyLoginAttempts(normalizedEmail)) {
      return NextResponse.json({ error: "Too many sign-in attempts. Try again later." }, { status: 429 });
    }

    const result = await getDatabasePool().query(
      `SELECT id, email, password_hash, role
       FROM users WHERE email = $1 AND is_active = true`,
      [normalizedEmail],
    );
    const user = result.rows[0];
    if (!user || !isAdminRole(user.role) || !(await verifyPassword(password, user.password_hash))) {
      await recordFailedLogin(normalizedEmail);
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await clearLoginAttempts(normalizedEmail);
    await createSession({ id: user.id, email: user.email, role: user.role });
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
  }
}
