import { Pool } from "pg";

declare global {
  var khmwDatabasePool: Pool | undefined;
}

export function getDatabasePool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for database-backed features.");
  }

  if (!global.khmwDatabasePool) {
    global.khmwDatabasePool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return global.khmwDatabasePool;
}
