/**
 * Database client for scripts (seed, migration, etc.)
 *
 * This file does NOT import 'server-only', so it can be used
 * by node scripts running via tsx (e.g. scripts/seed.ts).
 *
 * For Next.js server components / API routes, use src/db/index.ts instead.
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[script-db] DATABASE_URL not set. Drizzle client may fail.');
}

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export type ScriptDB = typeof db;