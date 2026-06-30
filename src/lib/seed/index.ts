/**
 * Seed utilities barrel
 * Re-export helpers and data for use in tests / dev utilities.
 */
export * from './vn-data';

// Example auto-seed pattern (call in dev only when you have real queries)
// Per random-data-seeder best practice: only seed when empty, guard by NODE_ENV
export async function ensureSeedIfEmpty() {
  if (process.env.NODE_ENV === 'production') return;

  // TODO: When you move admin pages off mocks to real DB queries, enable this:
  //
  // import { db } from '@/db';
  // import { users } from '@/db/schema';
  // import { count } from 'drizzle-orm';
  // import { seedAll } from '../../scripts/seed'; // note path
  //
  // const [{ c: userCount }] = await db.select({ c: count() }).from(users);
  // if (userCount === 0) {
  //   console.log('[seed] Database empty — running initial seed...');
  //   await seedAll();
  // }
}
