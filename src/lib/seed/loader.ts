/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Unified Data Loader (JSON / DB / Mock)
 * Centralized in src/lib/seed/loader.ts
 *
 * Single source of truth for all admin/app data loading.
 * Respects DATA_SOURCE env (auto | json | db | mock) via config.ts.
 *
 * IMPORTANT for client bundles:
 * - Client components (e.g. use-admin-data.ts used by /admin pages) import this file.
 * - All server-only code (fs, pg, db-queries) must be behind runtime guards + variable module specifiers
 *   so the bundler does not pull Node-only packages into the client chunk.
 */

import {
  mockUsers,
  mockArticles,
  mockOrders,
  mockCategories,
  mockComments,
  mockBanners,
  mockCustomers,
  mockRoles,
  mockInvoices,
  mockApiKeys,
  mockAiTools,
  mockAiHistory,
  mockRevenueReport,
  mockPerformanceReport,
  mockTrafficReport,
  mockUsersReport,
  mockNotifications,
  mockMessages,
  dashboardStats,
  recentActivities,
  revenueChartData,
  userGrowthData,
  trafficSourceData,
  deviceData,
  conversionData,
} from './mock-data';

import type {
  UserRecord,
  ArticleRecord,
  OrderRecord,
  CategoryRecord,
  CommentRecord,
  BannerRecord,
  CustomerRecord,
  RoleRecord,
  InvoiceRecord,
  ApiKeyRecord,
  AiToolRecord,
  AiHistoryRecord,
  RevenueReportData,
  PerformanceReportData,
  TrafficReportData,
  UsersReportData,
  NotificationItem,
  MessageItem,
} from '../admin/types';

import { getResolvedDataSource, type DataSourceMode } from './config';

const SEED_BASE = '/seed-data';
const API_BASE = '/api/admin/data';

// ======================
// Low-level loaders
// ======================

async function tryLoadJson<T>(filename: string): Promise<T[] | null> {
  // Server: prefer local private seed-data (faster, no network)
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const pathModule = await import('path');
      const privatePath = pathModule.join(process.cwd(), 'seed-data', filename);
      if (fs.existsSync(privatePath)) {
        const content = fs.readFileSync(privatePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch {
      // ignore - will fall through
    }
    return null;
  }

  // Client: fetch from public/seed-data
  try {
    const res = await fetch(`${SEED_BASE}/${filename}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {
    // ignore
  }
  return null;
}

async function fetchFromApi<T>(type: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${API_BASE}/${type}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {
    // ignore
  }
  return null;
}

type DbGetter = () => Promise<unknown[]>;

async function getDbFunction(entity: string): Promise<DbGetter | null> {
  if (typeof window !== 'undefined') {
    return null;
  }

  // Use a variable for the module specifier.
  // This prevents the client bundler from statically including 'pg' and 'fs'
  // when this file is imported by client components (e.g. use-admin-data.ts).
  const dbQueriesPath = '../admin/db-queries';
  const db = await import(dbQueriesPath);

  const map: Record<string, string> = {
    users: 'getUsersFromDb',
    articles: 'getArticlesFromDb',
    categories: 'getCategoriesFromDb',
    orders: 'getOrdersFromDb',
    comments: 'getCommentsFromDb',
    banners: 'getBannersFromDb',
    invoices: 'getInvoicesFromDb',
    'api-keys': 'getApiKeysFromDb',
    'ai-tools': 'getAiToolsFromDb',
    'ai-history': 'getAiHistoryFromDb',
  };
  const fnName = map[entity];
  if (!fnName) return null;
  const fn = (db as Record<string, unknown>)[fnName];
  return typeof fn === 'function' ? (fn as DbGetter) : null;
}

async function getFromDb<T>(entity: string): Promise<T[]> {
  if (typeof window !== 'undefined') {
    // On client: NEVER execute any DB/pg code. Always use API or JSON fallback.
    const data = await fetchFromApi<T>(entity);
    return data ?? [];
  }

  try {
    const fn = await getDbFunction(entity);
    if (fn) {
      const data = await fn();
      return (data as T[]) || [];
    }
    return [];
  } catch (err) {
    console.error('[data-loader] DB query failed for', entity, err);
    return [];
  }
}

// ======================
// Core resolve logic
// ======================

async function resolve<T>(
  jsonFile: string,
  mockData: T[],
  dbEntity?: string,
  modeOverride?: DataSourceMode
): Promise<T[]> {
  const mode = modeOverride || getResolvedDataSource();

  if (mode === 'json') {
    const json = await tryLoadJson<T>(jsonFile);
    return json ?? mockData;
  }

  if (mode === 'mock') {
    return mockData;
  }

  if (mode === 'db' && dbEntity) {
    const dbData = await getFromDb<T>(dbEntity);
    return dbData && dbData.length > 0 ? dbData : mockData;
  }

  // auto (default)
  const json = await tryLoadJson<T>(jsonFile);
  if (json && json.length > 0) return json;

  if (dbEntity) {
    const dbData = await getFromDb<T>(dbEntity);
    if (dbData && dbData.length > 0) return dbData;
  }

  return mockData;
}

// ======================
// Report helpers (object shape, not array)
// ======================

type ReportsJson = {
  revenue?: RevenueReportData;
  performance?: PerformanceReportData;
  traffic?: TrafficReportData;
  users?: UsersReportData;
};



// ======================
// Factory for custom loader instances (e.g. with forced dataSource)
// ======================

export type DataLoaderOptions = {
  dataSource?: DataSourceMode;
};

export interface DataLoader {
  getUsers(): Promise<UserRecord[]>;
  getArticles(): Promise<ArticleRecord[]>;
  getOrders(): Promise<OrderRecord[]>;
  getCategories(): Promise<CategoryRecord[]>;
  getComments(): Promise<CommentRecord[]>;
  getBanners(): Promise<BannerRecord[]>;
  getCustomers(): Promise<CustomerRecord[]>;
  getRoles(): Promise<RoleRecord[]>;
  getInvoices(): Promise<InvoiceRecord[]>;
  getApiKeys(): Promise<ApiKeyRecord[]>;
  getAiTools(): Promise<AiToolRecord[]>;
  getAiHistory(): Promise<AiHistoryRecord[]>;
  getRevenueReport(): Promise<RevenueReportData>;
  getPerformanceReport(): Promise<PerformanceReportData>;
  getTrafficReport(): Promise<TrafficReportData>;
  getUsersReport(): Promise<UsersReportData>;
  getNotifications(): Promise<NotificationItem[]>;
  getMessages(): Promise<MessageItem[]>;
  getDashboardStats(): Promise<any[]>;
  getRevenueChartData(): Promise<any[]>;
  getUserGrowthData(): Promise<any[]>;
  getTrafficSourceData(): Promise<any[]>;
  getDeviceData(): Promise<any[]>;
  getConversionData(): Promise<any[]>;
  getRecentActivities(): Promise<any[]>;
  loadAllSeedData(): Promise<{
    users: UserRecord[];
    articles: ArticleRecord[];
    orders: OrderRecord[];
    categories: CategoryRecord[];
    comments: CommentRecord[];
    banners: BannerRecord[];
  }>;
}

function createLoader(modeOverride?: DataSourceMode): DataLoader {
  const resolveWithMode = <T>(jsonFile: string, mockData: T[], dbEntity?: string) =>
    resolve(jsonFile, mockData, dbEntity, modeOverride);

  const getMode = () => modeOverride || getResolvedDataSource();

  const getRolesWithMode = async (): Promise<RoleRecord[]> => {
    const m = getMode();
    if (m === 'mock') return mockRoles;
    const json = await tryLoadJson<RoleRecord>('roles.json');
    return json ?? mockRoles;
  };

  const getNotificationsWithMode = async (): Promise<NotificationItem[]> => {
    const m = getMode();
    if (m === 'mock') return mockNotifications;
    const json = await tryLoadJson<NotificationItem>('notifications.json');
    return json && json.length > 0 ? json : mockNotifications;
  };

  const getMessagesWithMode = async (): Promise<MessageItem[]> => {
    const m = getMode();
    if (m === 'mock') return mockMessages;
    const json = await tryLoadJson<MessageItem>('messages.json');
    return json && json.length > 0 ? json : mockMessages;
  };

  const tryLoadReportsWithMode = async (): Promise<ReportsJson | null> => {
    // reports always try json first, respect mock
    const m = getMode();
    if (m === 'mock') return null;
    if (typeof window === 'undefined') {
      try {
        const fs = await import('fs');
        const pathModule = await import('path');
        const privatePath = pathModule.join(process.cwd(), 'seed-data', 'reports.json');
        if (fs.existsSync(privatePath)) {
          const content = fs.readFileSync(privatePath, 'utf-8');
          return JSON.parse(content);
        }
      } catch {}
      return null;
    }
    try {
      const res = await fetch(`${SEED_BASE}/reports.json`, { cache: 'no-store' });
      if (res.ok) return await res.json() as ReportsJson;
    } catch {}
    return null;
  };

  const getDashboardWithMode = async (file: string, fallback: any[]) => {
    const m = getMode();
    if (m === 'mock') return fallback;
    const json = await tryLoadJson<any>(file);
    return json && json.length > 0 ? json : fallback;
  };

  return {
    getUsers: () => resolveWithMode('users.json', mockUsers, 'users'),
    getArticles: () => resolveWithMode('articles.json', mockArticles, 'articles'),
    getOrders: () => resolveWithMode('orders.json', mockOrders, 'orders'),
    getCategories: () => resolveWithMode('categories.json', mockCategories, 'categories'),
    getComments: () => resolveWithMode('comments.json', mockComments, 'comments'),
    getBanners: () => resolveWithMode('banners.json', mockBanners, 'banners'),
    getCustomers: () => resolveWithMode('customers.json', mockCustomers, 'customers'),
    getRoles: getRolesWithMode,
    getInvoices: () => resolveWithMode('invoices.json', mockInvoices, 'invoices'),
    getApiKeys: () => resolveWithMode('api-keys.json', mockApiKeys, 'api-keys'),
    getAiTools: () => resolveWithMode('ai-tools.json', mockAiTools, 'ai-tools'),
    getAiHistory: () => resolveWithMode('ai-history.json', mockAiHistory, 'ai-history'),

    getRevenueReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.revenue ?? mockRevenueReport;
    },
    getPerformanceReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.performance ?? mockPerformanceReport;
    },
    getTrafficReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.traffic ?? mockTrafficReport;
    },
    getUsersReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.users ?? mockUsersReport;
    },

    getNotifications: getNotificationsWithMode,
    getMessages: getMessagesWithMode,

    getDashboardStats: () => getDashboardWithMode('dashboard-stats.json', dashboardStats),
    getRevenueChartData: () => getDashboardWithMode('revenue-chart.json', revenueChartData),
    getUserGrowthData: () => getDashboardWithMode('user-growth.json', userGrowthData),
    getTrafficSourceData: () => getDashboardWithMode('traffic-source.json', trafficSourceData),
    getDeviceData: () => getDashboardWithMode('device-data.json', deviceData),
    getConversionData: () => getDashboardWithMode('conversion-data.json', conversionData),
    getRecentActivities: () => getDashboardWithMode('recent-activities.json', recentActivities),

    loadAllSeedData: async () => {
      const [users, articles, orders, categories, comments, banners] = await Promise.all([
        resolveWithMode('users.json', mockUsers, 'users'),
        resolveWithMode('articles.json', mockArticles, 'articles'),
        resolveWithMode('orders.json', mockOrders, 'orders'),
        resolveWithMode('categories.json', mockCategories, 'categories'),
        resolveWithMode('comments.json', mockComments, 'comments'),
        resolveWithMode('banners.json', mockBanners, 'banners'),
      ]);
      return { users, articles, orders, categories, comments, banners };
    },
  };
}

// Default instance (uses global DATA_SOURCE)
export const dataLoader: DataLoader = createLoader();

/** Factory to create a loader with specific options (e.g. forced dataSource for testing or special contexts) */
export function createDataLoader(options: DataLoaderOptions = {}): DataLoader {
  return createLoader(options.dataSource);
}

// Re-export the methods from the default instance for ergonomic top-level imports
export const {
  getUsers,
  getArticles,
  getOrders,
  getCategories,
  getComments,
  getBanners,
  getCustomers,
  getRoles,
  getInvoices,
  getApiKeys,
  getAiTools,
  getAiHistory,
  getRevenueReport,
  getPerformanceReport,
  getTrafficReport,
  getUsersReport,
  getNotifications,
  getMessages,
  getDashboardStats,
  getRevenueChartData,
  getUserGrowthData,
  getTrafficSourceData,
  getDeviceData,
  getConversionData,
  getRecentActivities,
  loadAllSeedData,
} = dataLoader;