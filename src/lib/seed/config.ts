/**
 * Centralized Data Source Configuration (now in src/lib/seed/)
 * 
 * This is one of the specific main files for all seed/mock/test data handling.
 * 
 * Supports modes:
 * - json: Use generated JSON seed files
 * - db: Use real PostgreSQL via Drizzle
 * - mock: Static mocks (fallback)
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
 * Production is strict: must be 'db'.
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
  if (typeof window !== 'undefined') {
    return hasDatabaseUrl ? 'db' : 'json';
  }

  return hasDatabaseUrl ? 'db' : 'json';
}

let _resolvedSource: ReturnType<typeof getResolvedDataSource> | null = null;

export function getResolvedSource(): ReturnType<typeof getResolvedDataSource> {
  if (!_resolvedSource) {
    _resolvedSource = getResolvedDataSource();
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[seed/config] DATA_SOURCE=${DATA_SOURCE} → resolved=${_resolvedSource} (prod=${isProduction}, hasDB=${hasDatabaseUrl})`);
    }
  }
  return _resolvedSource;
}
