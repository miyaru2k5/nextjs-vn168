/**
 * ensure-dev-seed.ts
 * 
 * Chạy tự động khi `npm run dev` để đảm bảo có dữ liệu mẫu.
 * 
 * Hỗ trợ các mode:
 * - json / auto: Tạo JSON seed nếu chưa có file
 * - db: Chạy seed vào PostgreSQL (script sẽ tự idempotent)
 * 
 * Sử dụng: 
 *   npm run seed:ensure
 *   # hoặc tự động qua dev script
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const isDev = process.env.NODE_ENV !== 'production';
const dataSource = (process.env.DATA_SOURCE || 'auto').toLowerCase();

if (!isDev) {
  console.log('⏭  Not development mode, skipping seed ensure.');
  process.exit(0);
}

console.log(`🌱 Ensuring dev seed data (DATA_SOURCE=${dataSource})...`);

async function main() {
  const seedDataDir = join(process.cwd(), 'seed-data');
  const publicSeedDataDir = join(process.cwd(), 'public', 'seed-data');
  const hasJsonSeed = 
    existsSync(join(seedDataDir, 'users.json')) || 
    existsSync(join(publicSeedDataDir, 'users.json'));

  if (dataSource === 'json' || dataSource === 'auto') {
    if (!hasJsonSeed) {
      console.log('  → No JSON seed data found. Running seed to generate JSON...');
      execSync('npx tsx scripts/seed.ts', { 
        stdio: 'inherit',
        env: { ...process.env, SEED_TO_JSON: 'true', SEED_TO_DB: 'false' }
      });
    } else {
      console.log('  ✓ JSON seed data already exists.');
    }
  } 

  if (dataSource === 'db' || (dataSource === 'auto' && process.env.DATABASE_URL)) {
    // For DB mode, we always let the seed script decide (it checks counts)
    // But to make sure dev has data, we can trigger it
    console.log('  → Ensuring database seed (idempotent)...');
    execSync('npx tsx scripts/seed.ts', { 
      stdio: 'inherit',
      env: { ...process.env, SEED_TO_DB: 'true' }
    });
  }

  console.log('✅ Dev seed ensure completed.');
}

main().catch((err) => {
  console.error('❌ Seed ensure failed:', err.message);
  // Do not fail dev server on seed error
  process.exit(0);
});
