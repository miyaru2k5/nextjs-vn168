import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db] DATABASE_URL not set. Drizzle client may fail.');
}

const pool = new Pool({
  connectionString,
  // For dev you may add ssl: { rejectUnauthorized: false } for some providers
});

export const db = drizzle(pool, { schema });

export type DB = typeof db;
