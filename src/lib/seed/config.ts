/**
 * Data Source Configuration
 *
 * Determines whether the app should use real DB data, mock data, or JSON seeds.
 *
 * Supported modes:
 *   - 'auto'  (default): Try DB once. If unavailable → permanently use mock.
 *   - 'db'    : Force DB (will fail hard if unavailable)
 *   - 'mock'  : Always use in-memory mock data
 *   - 'json'  : Prefer JSON files in /seed-data (legacy)
 *
 * Environment override:
 *   DATA_SOURCE=auto|db|mock|json
 */

export type DataSourceMode = 'auto' | 'db' | 'mock' | 'json';

// Module-level cache
let resolvedMode: DataSourceMode | null = null;
let dbHealthChecked = false;
let dbIsAvailable = true;



/**
 * Check env for forced mode.
 */
function getEnvMode(): DataSourceMode | null {
  const env = (process.env.DATA_SOURCE || process.env.NEXT_PUBLIC_DATA_SOURCE || '').toLowerCase().trim();
  if (['auto', 'db', 'mock', 'json'].includes(env)) {
    return env as DataSourceMode;
  }
  return null;
}

/**
 * Async health check (only runs once).
 * We import dynamically to avoid circular issues.
 */
async function performDbHealthCheck(): Promise<boolean> {
  if (dbHealthChecked) return dbIsAvailable;

  try {
    // Dynamic import to keep this module light
    const { checkDatabaseConnection } = await import('@/lib/db/health');
    dbIsAvailable = await checkDatabaseConnection();
  } catch {
    dbIsAvailable = false;
  }

  dbHealthChecked = true;
  return dbIsAvailable;
}

/**
 * Resolve the effective data source mode.
 * In 'auto' mode, we perform a one-time DB check and lock the decision.
 */
export async function getResolvedDataSource(): Promise<DataSourceMode> {
  if (resolvedMode) {
    return resolvedMode;
  }

  const envMode = getEnvMode();

  if (envMode && envMode !== 'auto') {
    resolvedMode = envMode;
    console.log(`[DataSource] Forced mode from env: ${resolvedMode}`);
    return resolvedMode;
  }

  // Default to auto behavior
  const forceDb = envMode === 'auto' || !envMode;

  if (!forceDb) {
    resolvedMode = envMode || 'mock';
    return resolvedMode;
  }

  // Auto mode: probe DB once
  const available = await performDbHealthCheck();

  if (available) {
    resolvedMode = 'db';
    console.log('[DataSource] Database available. Using DB data source.');
  } else {
    resolvedMode = 'mock';
    console.log('[DataSource] Database unavailable. Permanently falling back to mock data.');
  }

  return resolvedMode;
}

/**
 * Synchronous version (for places where async is inconvenient).
 * Returns best guess without waiting. After first async resolution it will be accurate.
 */
export function getResolvedDataSourceSync(): DataSourceMode {
  if (resolvedMode) return resolvedMode;

  const envMode = getEnvMode();
  if (envMode && envMode !== 'auto') {
    return envMode;
  }

  // Not resolved yet — return 'auto' or 'mock' as safe default for sync contexts
  return envMode || 'auto';
}

/**
 * Force a mode (useful for tests or runtime override).
 */
export function setDataSourceMode(mode: DataSourceMode) {
  resolvedMode = mode;
}
