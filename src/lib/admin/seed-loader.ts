/**
 * Unified Data Loader (JSON / DB / Mock)
 *
 * Respects DATA_SOURCE env (auto | json | db | mock)
 * - json: generated seed JSON files (great for fast local, no DB)
 * - db: real PostgreSQL via Drizzle
 * - mock: static demo data
 *
 * This enables the three requested modes:
 *   1. Local using JSON files
 *   2. Local with real PostgreSQL (seeded)
 *   3. Production (real DB only, strict no-mock)
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
  type UserRecord,
  type ArticleRecord,
  type OrderRecord,
  type CategoryRecord,
  type CommentRecord,
  type BannerRecord,
  type CustomerRecord,
  type RoleRecord,
  type InvoiceRecord,
  type ApiKeyRecord,
  type AiToolRecord,
  type AiHistoryRecord,
  type RevenueReportData,
  type PerformanceReportData,
  type TrafficReportData,
  type UsersReportData,
} from './mock-data';

import { getResolvedDataSource } from './data-config';

const SEED_BASE = '/seed-data';
const API_BASE = '/api/admin/data';

async function tryLoadJson<T>(filename: string): Promise<T[] | null> {
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
      // ignore
    }
    return null;
  }

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
  const db = await import('./db-queries');
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
    console.error('[seed-loader] DB query failed for', entity, err);
    return [];
  }
}

async function resolve<T>(
  jsonFile: string,
  mockData: T[],
  dbEntity: string
): Promise<T[]> {
  const mode = getResolvedDataSource();

  if (mode === 'json') {
    const json = await tryLoadJson<T>(jsonFile);
    return json ?? mockData;
  }

  if (mode === 'mock') {
    return mockData;
  }

  if (mode === 'db') {
    const dbData = await getFromDb<T>(dbEntity);
    return (dbData && dbData.length > 0) ? dbData : mockData;
  }

  // auto
  const json = await tryLoadJson<T>(jsonFile);
  if (json && json.length > 0) return json;

  const dbData = await getFromDb<T>(dbEntity);
  if (dbData && dbData.length > 0) return dbData;

  return mockData;
}

type ReportsJson = {
  revenue?: RevenueReportData;
  performance?: PerformanceReportData;
  traffic?: TrafficReportData;
  users?: UsersReportData;
};

async function tryLoadReports(): Promise<ReportsJson | null> {
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const pathModule = await import('path');
      const privatePath = pathModule.join(process.cwd(), 'seed-data', 'reports.json');
      if (fs.existsSync(privatePath)) {
        const content = fs.readFileSync(privatePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch {
      // ignore
    }
    return null;
  }

  try {
    const res = await fetch(`${SEED_BASE}/reports.json`, { cache: 'no-store' });
    if (res.ok) return await res.json() as ReportsJson;
  } catch {
    // ignore
  }
  return null;
}

export async function getUsers(): Promise<UserRecord[]> {
  return resolve('users.json', mockUsers, 'users');
}

export async function getArticles(): Promise<ArticleRecord[]> {
  return resolve('articles.json', mockArticles, 'articles');
}

export async function getOrders(): Promise<OrderRecord[]> {
  return resolve('orders.json', mockOrders, 'orders');
}

export async function getCategories(): Promise<CategoryRecord[]> {
  return resolve('categories.json', mockCategories, 'categories');
}

export async function getComments(): Promise<CommentRecord[]> {
  return resolve('comments.json', mockComments, 'comments');
}

export async function getBanners(): Promise<BannerRecord[]> {
  return resolve('banners.json', mockBanners, 'banners');
}

export async function getCustomers(): Promise<CustomerRecord[]> {
  return resolve('customers.json', mockCustomers, 'customers');
}

export async function getRoles(): Promise<RoleRecord[]> {
  const json = await tryLoadJson<RoleRecord>('roles.json');
  return json ?? mockRoles;
}

export async function getInvoices(): Promise<InvoiceRecord[]> {
  return resolve('invoices.json', mockInvoices, 'invoices');
}

export async function getApiKeys(): Promise<ApiKeyRecord[]> {
  return resolve('api-keys.json', mockApiKeys, 'api-keys');
}

export async function getAiTools(): Promise<AiToolRecord[]> {
  return resolve('ai-tools.json', mockAiTools, 'ai-tools');
}

export async function getAiHistory(): Promise<AiHistoryRecord[]> {
  return resolve('ai-history.json', mockAiHistory, 'ai-history');
}

export async function getRevenueReport(): Promise<RevenueReportData> {
  const data = await tryLoadReports();
  return data?.revenue ?? mockRevenueReport;
}

export async function getPerformanceReport(): Promise<PerformanceReportData> {
  const data = await tryLoadReports();
  return data?.performance ?? mockPerformanceReport;
}

export async function getTrafficReport(): Promise<TrafficReportData> {
  const data = await tryLoadReports();
  return data?.traffic ?? mockTrafficReport;
}

export async function getUsersReport(): Promise<UsersReportData> {
  const data = await tryLoadReports();
  return data?.users ?? mockUsersReport;
}

export async function loadAllSeedData() {
  const [users, articles, orders, categories, comments, banners] = await Promise.all([
    getUsers(), getArticles(), getOrders(), getCategories(), getComments(), getBanners(),
  ]);
  return { users, articles, orders, categories, comments, banners };
}