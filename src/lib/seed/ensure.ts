/**
 * Dev Ensure / Bootstrap (centralized in src/lib/seed/ensure.ts)
 *
 * This is one of the specific main files.
 * All ensure/seed bootstrap logic is concentrated here.
 *
 * Used by:
 * - scripts/ensure-dev-seed.ts (via thin wrapper)
 * - src/app/layout.tsx (via re-export)
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

export async function ensureDevSeed() {
  const globalForSeed = globalThis as unknown as {
    __devSeedEnsured?: boolean;
  };

  if (globalForSeed.__devSeedEnsured) {
    return;
  }

  const isDev = process.env.NODE_ENV !== 'production';
  const dataSource = (process.env.DATA_SOURCE || 'auto').toLowerCase();

  if (!isDev) {
    console.log('⏭  Not development mode, skipping seed ensure.');
    return;
  }

  globalForSeed.__devSeedEnsured = true;

  console.log(`🌱 Ensuring dev seed data (DATA_SOURCE=${dataSource})...`);

  const seedDataDir = join(process.cwd(), 'seed-data');
  const publicSeedDataDir = join(process.cwd(), 'public', 'seed-data');

  const coreJsonFiles = [
    'users.json',
    'orders.json',
    'reports.json',
    'notifications.json',
    'messages.json',
    'roles.json',
    'invoices.json',
    'ai-history.json',
    'dashboard-stats.json',
    'revenue-chart.json',
    'recent-activities.json',
  ];

  const hasAllCoreFiles = coreJsonFiles.every((file) =>
    existsSync(join(seedDataDir, file)) || existsSync(join(publicSeedDataDir, file))
  );

  if (dataSource === 'json' || dataSource === 'auto') {
    if (!hasAllCoreFiles) {
      console.log('  → Missing core JSON seed data. Generating fresh seed JSON...');
      execSync('npx tsx scripts/seed.ts', {
        stdio: 'inherit',
        env: { ...process.env, SEED_TO_JSON: 'true', SEED_TO_DB: 'false' },
      });
    } else {
      console.log('  ✓ JSON seed data already exists.');
    }
  }

  if (dataSource === 'db' || (dataSource === 'auto' && process.env.DATABASE_URL)) {
    console.log('  → Ensuring database seed (idempotent)...');
    execSync('npx tsx scripts/seed.ts', {
      stdio: 'inherit',
      env: { ...process.env, SEED_TO_DB: 'true' },
    });
  }

  console.log('✅ Dev seed ensure completed.');
}

// For compatibility with previous runtime call
export { ensureDevSeed as ensureDevSeedOnStart };