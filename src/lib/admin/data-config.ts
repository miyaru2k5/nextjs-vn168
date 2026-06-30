/**
 * Centralized Data Source Configuration
 * 
 * Supports 3 modes as discussed:
 * - json: Use generated JSON seed files (ideal for pure local dev, no DB needed)
 * - db: Use real PostgreSQL via Drizzle (local with DB or production)
 * - mock: Always use static mocks (demo / fallback)
 * - auto (default): Smart selection
 */

export type DataSourceMode = 'auto' | 'json' | 'db' | 'mock';

const rawMode = (process.env.DATA_SOURCE || 'auto').toLowerCase() as DataSourceMode;

export const DATA_SOURCE: DataSourceMode = ['auto', 'json', 'db', 'mock'].includes(rawMode) 
  ? rawMode 
  : 'auto';

export const isProduction = process.env.NODE_ENV === 'production';

export const hasDatabaseUrl = !!process.env.DATABASE_URL;

/**
 * Final resolved source after applying rules.
 * Production is strict: must be 'db'. We throw to prevent accidental use of mocks/JSON in prod.
 */
export function getResolvedDataSource(): Exclude<DataSourceMode, 'auto'> {
  if (isProduction) {
    if (DATA_SOURCE !== 'db') {
      const errorMsg = 
        `CRITICAL: Production must use DATA_SOURCE=db. ` +
        `Current DATA_SOURCE="${DATA_SOURCE}". ` +
        `Using mock or JSON data in production is not allowed.`;
      console.error('❌ ' + errorMsg);
      throw new Error(errorMsg);
    }
    return 'db';
  }

  if (DATA_SOURCE === 'json') return 'json';
  if (DATA_SOURCE === 'mock') return 'mock';
  if (DATA_SOURCE === 'db') return 'db';

  // auto mode
  // Prefer JSON if the seed files were generated (common for fast local)
  // Then real DB if DATABASE_URL present
  // Else mock
  if (typeof window !== 'undefined') {
    // On client we can't easily check fs, rely on whether JSON fetch works later
    // Default heuristic for auto on client
    return hasDatabaseUrl ? 'db' : 'json';
  }

  // Server
  // We can check for presence of seed JSON or just prefer DB if configured
  return hasDatabaseUrl ? 'db' : 'json';
}

export const resolvedSource = getResolvedDataSource();

console.log(`[data-config] DATA_SOURCE=${DATA_SOURCE} → resolved=${resolvedSource} (prod=${isProduction}, hasDB=${hasDatabaseUrl})`);
