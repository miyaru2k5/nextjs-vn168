/**
 * Client-safe Data Loader
 *
 * Only uses fetch-based JSON loading + mock fallback.
 * NEVER imports db-queries or pg — safe for client bundles.
 */

import {
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
  type RevenueReportData,
  type PerformanceReportData,
  type TrafficReportData,
  type UsersReportData,
  mockRevenueReport,
  mockPerformanceReport,
  mockTrafficReport,
  mockUsersReport,
} from './mock-data';

const SEED_BASE = '/seed-data';
const API_BASE = '/api/admin/data';

async function tryLoadJson<T>(filename: string): Promise<T[] | null> {
  // On client (browser), fetch via HTTP
  try {
    const res = await fetch(`${SEED_BASE}/${filename}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

async function fetchFromApi<T>(type: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${API_BASE}/${type}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

async function resolve<T>(
  jsonFile: string,
  mockData: T[],
): Promise<T[]> {
  // Client always tries JSON files first, then mock fallback
  const json = await tryLoadJson<T>(jsonFile);
  if (json && json.length > 0) return json;

  // Fallback: try the API endpoint (which may read from DB server-side)
  const entity = jsonFile.replace('.json', '');
  const apiData = await fetchFromApi<T>(entity);
  if (apiData && apiData.length > 0) return apiData;

  return mockData;
}

export async function getUsers(): Promise<UserRecord[]> {
  return resolve('users.json', mockUsers);
}

export async function getArticles(): Promise<ArticleRecord[]> {
  return resolve('articles.json', mockArticles);
}

export async function getOrders(): Promise<OrderRecord[]> {
  return resolve('orders.json', mockOrders);
}

export async function getCategories(): Promise<CategoryRecord[]> {
  return resolve('categories.json', mockCategories);
}

export async function getComments(): Promise<CommentRecord[]> {
  return resolve('comments.json', mockComments);
}

export async function getBanners(): Promise<BannerRecord[]> {
  return resolve('banners.json', mockBanners);
}

export async function getCustomers(): Promise<CustomerRecord[]> {
  return resolve('customers.json', mockCustomers);
}

export async function getRoles(): Promise<RoleRecord[]> {
  return resolve('roles.json', mockRoles);
}

export async function getInvoices(): Promise<InvoiceRecord[]> {
  return resolve('invoices.json', mockInvoices);
}

export async function getApiKeys(): Promise<ApiKeyRecord[]> {
  return resolve('api-keys.json', mockApiKeys);
}

export async function getAiTools(): Promise<AiToolRecord[]> {
  return resolve('ai-tools.json', mockAiTools);
}

export async function getAiHistory(): Promise<AiHistoryRecord[]> {
  return resolve('ai-history.json', mockAiHistory);
}

type ReportsJson = {
  revenue?: RevenueReportData;
  performance?: PerformanceReportData;
  traffic?: TrafficReportData;
  users?: UsersReportData;
};

// Reports — only use JSON or mock on client
// reports.json is an object, not an array, so we use a separate loader
async function tryLoadReportJson(): Promise<ReportsJson | null> {
  try {
    const res = await fetch(`${SEED_BASE}/reports.json`, { cache: 'no-store' });
    if (res.ok) return await res.json() as ReportsJson;
  } catch {}
  return null;
}

export async function getRevenueReport(): Promise<RevenueReportData> {
  const data = await tryLoadReportJson();
  return data?.revenue ?? mockRevenueReport;
}

export async function getPerformanceReport(): Promise<PerformanceReportData> {
  const data = await tryLoadReportJson();
  return data?.performance ?? mockPerformanceReport;
}

export async function getTrafficReport(): Promise<TrafficReportData> {
  const data = await tryLoadReportJson();
  return data?.traffic ?? mockTrafficReport;
}

export async function getUsersReport(): Promise<UsersReportData> {
  const data = await tryLoadReportJson();
  return data?.users ?? mockUsersReport;
}
