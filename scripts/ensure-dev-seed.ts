/**
 * scripts/ensure-dev-seed.ts
 *
 * Thin wrapper. Real logic is centralized in src/lib/seed/ensure.ts
 *
 * This is the entry point called by:
 *   - "dev" script in package.json
 *   - "seed:ensure"
 */

import { ensureDevSeed } from '../src/lib/seed/ensure';

async function main() {
  await ensureDevSeed();
}

main().catch((err) => {
  console.error('❌ Seed ensure failed:', err.message);
  // Do not fail dev server on seed error
  process.exit(0);
});
