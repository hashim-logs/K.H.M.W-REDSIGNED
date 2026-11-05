import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import readline from "node:readline/promises";
import pg from "pg";

const { Pool } = pg;
const scrypt = promisify(scryptCallback);
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Set DATABASE_URL before creating an administrator.");
const role = process.argv[2] ?? "admin";
if (role !== "admin" && role !== "editor") {
  throw new Error("Specify either admin or editor.");
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const email = (await rl.question(`${role === "admin" ? "Administrator" : "Editor"} email: `)).trim().toLowerCase();
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
        reject(new Error("Password entry cancelled."));
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

const password = await readHidden("Password (minimum 12 characters): ");
if (Buffer.byteLength(password) < 12 || Buffer.byteLength(password) > 1024) {
  throw new Error("Password must be between 12 and 1024 bytes.");
}
const confirmation = await readHidden("Repeat password: ");
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
  await client.query("SELECT pg_advisory_xact_lock(774621310)");
  if (role === "admin") {
    const existing = await client.query("SELECT 1 FROM users WHERE role = 'admin' LIMIT 1");
    if (existing.rowCount) {
      throw new Error("An administrator already exists. Bootstrap is one-time and cannot reset or add accounts.");
    }
  } else {
    const existingAdmin = await client.query("SELECT 1 FROM users WHERE role = 'admin' AND is_active = true LIMIT 1");
    if (!existingAdmin.rowCount) {
      throw new Error("Create the initial administrator before creating an editor account.");
    }
  }
  await client.query(
    "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)",
    [email, passwordHash, role],
  );
  await client.query("COMMIT");
  console.info(`${role === "admin" ? "Administrator" : "Editor"} credentials saved for ${email}.`);
} catch (error) {
  await client.query("ROLLBACK").catch((rollbackError) => {
    console.error("Account provisioning rollback failed:", rollbackError);
  });
  if (error && typeof error === "object" && "code" in error && error.code === "23505") {
    throw new Error("That email already has an account. Provisioning never overwrites existing credentials.");
  }
  throw error;
} finally {
  client.release();
  await pool.end();
}
