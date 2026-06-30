/**
 * Runtime ensure dev seed (called from inside the app)
 * 
 * Dùng để tự động seed khi app start ở development,
 * ngay cả khi chạy `next dev` trực tiếp mà không qua script.
 * 
 * Chỉ chạy ở dev và chỉ một lần (dùng module cache).
 */

import { getResolvedDataSource } from '@/lib/admin/data-config';

let seeded = false;

export async function ensureDevSeedOnStart() {
  if (typeof window !== 'undefined') return; // client
  if (process.env.NODE_ENV !== 'development') return;
  if (seeded) return;

  const source = getResolvedDataSource();

  // Chỉ tự động seed ở local khi chưa có dữ liệu
  if (source === 'json') {
    try {
      // Kiểm tra nhanh bằng cách import loader
      const { getUsers } = await import('@/lib/admin/seed-loader');
      const users = await getUsers();

      if (!users || users.length === 0) {
        console.log('🌱 [runtime] No seed data detected. Triggering seed...');
        // Gọi script đảm bảo (chạy ngầm)
        const { exec } = await import('child_process');
        exec('npx tsx scripts/ensure-dev-seed.ts', (err) => {
          if (err) console.error('[seed] Runtime seed failed:', err);
        });
      }
    } catch {
      // ignore
    }
  }

  seeded = true;
}
