/**
 * Database Health Check Utility
 *
 * Provides a cached, one-time check for database availability.
 * Once DB is detected as unavailable, it stays unavailable for the lifetime of the process.
 * This prevents repeated failed connection attempts on every request.
 */

import 'server-only';

import { db } from '@/db';
import { users } from '@/db/schema';

type HealthState = {
  checked: boolean;
  available: boolean;
};

const healthState: HealthState = {
  checked: false,
  available: true, // optimistic until proven otherwise
};

let checkPromise: Promise<boolean> | null = null;

/**
 * Perform a lightweight check against the database.
 * Caches the result globally so subsequent calls are instant.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  if (healthState.checked) {
    return healthState.available;
  }

  // Prevent multiple simultaneous checks
  if (checkPromise) {
    return checkPromise;
  }

  checkPromise = (async () => {
    try {
      // Lightweight query - just check if we can reach the DB
      await db.select({ id: users.id }).from(users).limit(1);
      
      healthState.available = true;
      healthState.checked = true;
      console.log('[DB Health] Database connection successful.');
      return true;
    } catch (err: any) {
      healthState.available = false;
      healthState.checked = true;
      // Log cleanly once. The actual connection error (ECONNREFUSED etc.) is expected in dev without DB.
      console.warn(`[DB Health] Database connection failed. Switching to mock data permanently. Reason: ${err?.code || err?.message || 'unknown error'}`);
      return false;
    } finally {
      checkPromise = null;
    }
  })();

  return checkPromise;
}

/**
 * Synchronous check after first resolution.
 * Use this in hot paths after initial check has run.
 */
export function isDatabaseAvailable(): boolean {
  if (!healthState.checked) {
    // Not checked yet — optimistic until proven false.
    // The API layer now forces a check for DB-backed resources.
    return true;
  }
  return healthState.available;
}

/**
 * Force reset health state (mainly for testing or dev hot reloads).
 */
export function resetDatabaseHealth() {
  healthState.checked = false;
  healthState.available = true;
  checkPromise = null;
}
