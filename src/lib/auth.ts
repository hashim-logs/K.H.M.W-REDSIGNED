import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getDatabasePool } from "@/lib/db";

const SESSION_COOKIE = "khmw_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;
const LOGIN_WINDOW_MINUTES = 15;
const MAX_LOGIN_ATTEMPTS = 5;

export type AdminRole = "admin" | "editor";

export type AdminSession = {
  id: string;
  email: string;
  role: AdminRole;
};

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function rateLimitKey(email: string): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 bytes.");
  }
  return createHmac("sha256", secret).update(email).digest("hex");
}

export function verifySameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.slice(0, -1);
  if (!origin || !host || (protocol !== "http" && protocol !== "https")) return false;

  try {
    return new URL(origin).origin === `${protocol}://${host}`;
  } catch {
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  if (password.length < 12 || Buffer.byteLength(password) > 1024) {
    throw new Error("Passwords must be between 12 and 1024 bytes.");
  }
  const salt = randomBytes(16);
  const derived = await derivePassword(password, salt);
  return `scrypt$${salt.toString("base64url")}$${derived.toString("base64url")}`;
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [algorithm, saltText, hashText] = encoded.split("$");
  if (algorithm !== "scrypt" || !saltText || !hashText) return false;
  const expected = Buffer.from(hashText, "base64url");
  if (expected.length !== 64) return false;
  const actual = await derivePassword(password, Buffer.from(saltText, "base64url"));
  return timingSafeEqual(expected, actual);
}

export async function hasTooManyLoginAttempts(email: string): Promise<boolean> {
  const result = await getDatabasePool().query(
    `SELECT blocked_until > now() AS blocked
     FROM login_attempts WHERE bucket_key = $1`,
    [rateLimitKey(email)],
  );
  return result.rows[0]?.blocked === true;
}

export async function recordFailedLogin(email: string): Promise<void> {
  await getDatabasePool().query(
    `INSERT INTO login_attempts (bucket_key, window_started_at, attempt_count)
     VALUES ($1, now(), 1)
     ON CONFLICT (bucket_key) DO UPDATE SET
       attempt_count = CASE
         WHEN login_attempts.window_started_at <= now() - ($2::integer * interval '1 minute') THEN 1
         ELSE login_attempts.attempt_count + 1
       END,
       window_started_at = CASE
         WHEN login_attempts.window_started_at <= now() - ($2::integer * interval '1 minute') THEN now()
         ELSE login_attempts.window_started_at
       END,
       blocked_until = CASE
         WHEN login_attempts.window_started_at <= now() - ($2 * interval '1 minute') THEN NULL
         WHEN login_attempts.attempt_count + 1 >= $3::integer THEN now() + ($2::integer * interval '1 minute')
         ELSE login_attempts.blocked_until
       END`,
    [rateLimitKey(email), LOGIN_WINDOW_MINUTES, MAX_LOGIN_ATTEMPTS],
  );
}

export async function clearLoginAttempts(email: string): Promise<void> {
  await getDatabasePool().query("DELETE FROM login_attempts WHERE bucket_key = $1", [rateLimitKey(email)]);
}

export async function createSession(user: AdminSession): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);
  await getDatabasePool().query(
    "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [hashToken(token), user.id, expiresAt],
  );
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await getDatabasePool().query(
      "UPDATE sessions SET revoked_at = now() WHERE token_hash = $1 AND revoked_at IS NULL",
      [hashToken(token)],
    );
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const result = await getDatabasePool().query<AdminSession>(
    `SELECT u.id, u.email, u.role
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1
       AND s.expires_at > now()
       AND s.revoked_at IS NULL
       AND u.is_active = true`,
    [hashToken(token)],
  );
  return result.rows[0] ?? null;
}

export function isAdminRole(role: string): role is AdminRole {
  return role === "admin" || role === "editor";
}

function derivePassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, 64, {
      N: 32_768,
      r: 8,
      p: 1,
      maxmem: 64 * 1024 * 1024,
    }, (error, derived) => {
      if (error) reject(error);
      else resolve(derived as Buffer);
    });
  });
}
