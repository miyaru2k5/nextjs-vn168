/**
 * Dev Ensure / Bootstrap (centralized in src/lib/seed/ensure.ts)
 *
 * Checks database state and runs seed if database is empty.
 * Strictly database-oriented, no JSON files are created or checked.
 *
 * Used by:
 * - scripts/ensure-dev-seed.ts (via thin wrapper)
 * - src/app/layout.tsx (via re-export)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { execSync } from 'child_process';

export async function ensureDevSeed() {
  const globalForSeed = globalThis as unknown as {
    __devSeedEnsured?: boolean;
  };

  if (globalForSeed.__devSeedEnsured) {
    return;
  }

  const isDev = process.env.NODE_ENV !== 'production';

  if (!isDev) {
    console.log('⏭  Not development mode, skipping seed ensure.');
    return;
  }

  globalForSeed.__devSeedEnsured = true;

  console.log(`🌱 Ensuring dev database seed data...`);

  try {
    // Use centralized health check (cached)
    const { checkDatabaseConnection } = await import('@/db');
    const isAvailable = await checkDatabaseConnection();

    if (!isAvailable) {
      console.warn('[ensure] Database not available. Skipping DB seed check.');
      return;
    }

    const { db } = await import('@/db');
    const { users } = await import('@/db/schema');
    
    // Check if database is empty by querying users limit 1
    const existingUsers = await db.select({ id: users.id }).from(users).limit(1);
    
    if (existingUsers.length === 0) {
      console.log('  → Database is empty. Seeding database (idempotent)...');
      execSync('npx tsx scripts/seed.ts', {
        stdio: 'inherit',
        env: { ...process.env, SEED_TO_DB: 'true' },
      });
    } else {
      console.log('  ✓ Database already contains data. Skipping seed.');
    }
  } catch (err: any) {
    console.warn('⚠️ Database empty check failed (it might not be initialized or migrated yet).', err.message);
    // Do NOT run seed script blindly if DB is known bad
  }

  console.log('✅ Dev seed ensure completed.');
}

// For compatibility with previous runtime call
export { ensureDevSeed as ensureDevSeedOnStart };