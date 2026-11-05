import pg from "pg";

const { Pool } = pg;
if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL before cleaning expired data.");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });

try {
  const [enquiries, sessions, attempts, contactLimits] = await Promise.all([
    pool.query("DELETE FROM contact_submissions WHERE expires_at <= now()"),
    pool.query("DELETE FROM sessions WHERE expires_at <= now() OR revoked_at < now() - interval '30 days'"),
    pool.query("DELETE FROM login_attempts WHERE window_started_at < now() - interval '1 day'"),
    pool.query("DELETE FROM contact_rate_limits WHERE window_started_at < now() - interval '1 day'"),
  ]);
  console.info(
    `Removed ${enquiries.rowCount} expired enquiries, ${sessions.rowCount} old sessions, `
    + `${attempts.rowCount} login limits, and ${contactLimits.rowCount} enquiry limits.`,
  );
} finally {
  await pool.end();
}
