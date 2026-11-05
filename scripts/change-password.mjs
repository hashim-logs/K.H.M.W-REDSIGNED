import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import readline from "node:readline/promises";
import pg from "pg";

const { Pool } = pg;
const scrypt = promisify(scryptCallback);
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Set DATABASE_URL before changing an account password.");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const email = (await rl.question("Account email: ")).trim().toLowerCase();
rl.close();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
  throw new Error("Enter a valid email address.");
}

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) return reject(new Error("Run this command in an interactive terminal."));
    process.stdout.write(prompt);
    let value = "";
    stdin.setRawMode(true);
    stdin.resume();
    const onData = (chunk) => {
      const character = chunk.toString("utf8");
      if (character === "\u0003") {
        stdin.off("data", onData);
        stdin.setRawMode(false);
        process.stdout.write("\n");
        reject(new Error("Password change cancelled."));
      } else if (character === "\r" || character === "\n") {
        stdin.off("data", onData);
        stdin.setRawMode(false);
        process.stdout.write("\n");
        resolve(value);
      } else if (character === "\u007f") {
        value = value.slice(0, -1);
      } else {
        value += character;
      }
    };
    stdin.on("data", onData);
  });
}

const password = await readHidden("New password (minimum 12 characters): ");
if (Buffer.byteLength(password) < 12 || Buffer.byteLength(password) > 1024) {
  throw new Error("Password must be between 12 and 1024 bytes.");
}
const confirmation = await readHidden("Repeat new password: ");
if (password !== confirmation) throw new Error("Passwords do not match.");

const salt = randomBytes(16);
const derived = await scrypt(password, salt, 64, {
  N: 32_768,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
});
const passwordHash = `scrypt$${salt.toString("base64url")}$${derived.toString("base64url")}`;
const pool = new Pool({ connectionString: databaseUrl, max: 1 });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  const updated = await client.query(
    `UPDATE users SET password_hash = $2, updated_at = now()
     WHERE email = $1 AND is_active = true
     RETURNING id`,
    [email, passwordHash],
  );
  if (!updated.rowCount) throw new Error("No active account exists for that email.");
  await client.query(
    "UPDATE sessions SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL",
    [updated.rows[0].id],
  );
  await client.query("COMMIT");
  console.info("Password updated and existing sessions revoked.");
} catch (error) {
  await client.query("ROLLBACK").catch((rollbackError) => {
    console.error("Password update rollback failed:", rollbackError);
  });
  throw error;
} finally {
  client.release();
  await pool.end();
}
