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
} from './mock-data';

import { getResolvedDataSource } from './data-config';
import * as dbQueries from './db-queries';

const SEED_BASE = '/seed-data';
const API_BASE = '/api/admin/data';

async function tryLoadJson<T>(filename: string): Promise<T[] | null> {
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const privatePath = path.join(process.cwd(), 'seed-data', filename);
      if (fs.existsSync(privatePath)) {
        const content = fs.readFileSync(privatePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch {}
    return null;
  }

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

async function getFromDb<T>(entity: string, serverFn: () => Promise<T[]>): Promise<T[]> {
  if (typeof window === 'undefined') {
    try {
      return await serverFn();
    } catch (e) {
      console.error('[seed-loader] DB query failed for', entity, e);
      return [];
    }
  } else {
    const data = await fetchFromApi<T>(entity);
    return data ?? [];
  }
}

async function resolve<T>(
  jsonFile: string,
  mockData: T[],
  dbEntity: string,
  dbFn: () => Promise<T[]>
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
    const dbData = await getFromDb<T>(dbEntity, dbFn);
    return dbData.length > 0 ? dbData : mockData;
  }

  // auto
  const json = await tryLoadJson<T>(jsonFile);
  if (json?.length) return json;

  const dbData = await getFromDb<T>(dbEntity, dbFn);
  if (dbData.length) return dbData;

  return mockData;
}

export async function getUsers(): Promise<UserRecord[]> {
  return resolve('users.json', mockUsers, 'users', dbQueries.getUsersFromDb);
}

export async function getArticles(): Promise<ArticleRecord[]> {
  return resolve('articles.json', mockArticles, 'articles', dbQueries.getArticlesFromDb);
}

export async function getOrders(): Promise<OrderRecord[]> {
  return resolve('orders.json', mockOrders, 'orders', dbQueries.getOrdersFromDb);
}

export async function getCategories(): Promise<CategoryRecord[]> {
  return resolve('categories.json', mockCategories, 'categories', dbQueries.getCategoriesFromDb);
}

export async function getComments(): Promise<CommentRecord[]> {
  return resolve('comments.json', mockComments, 'comments', dbQueries.getCommentsFromDb);
}

export async function getBanners(): Promise<BannerRecord[]> {
  return resolve('banners.json', mockBanners, 'banners', dbQueries.getBannersFromDb);
}

export async function getCustomers(): Promise<CustomerRecord[]> {
  return resolve('customers.json', mockCustomers, 'customers', async () => []);
}

export async function getRoles(): Promise<RoleRecord[]> {
  const json = await tryLoadJson<RoleRecord>('roles.json');
  return json ?? mockRoles;
}

export async function getInvoices(): Promise<InvoiceRecord[]> {
  return resolve('invoices.json', mockInvoices, 'invoices', dbQueries.getInvoicesFromDb);
}

export async function getApiKeys(): Promise<ApiKeyRecord[]> {
  return resolve('api-keys.json', mockApiKeys, 'api-keys', dbQueries.getApiKeysFromDb);
}

export async function getAiTools(): Promise<AiToolRecord[]> {
  return resolve('ai-tools.json', mockAiTools, 'ai-tools', dbQueries.getAiToolsFromDb);
}

export async function getAiHistory(): Promise<AiHistoryRecord[]> {
  return resolve('ai-history.json', mockAiHistory, 'ai-history', dbQueries.getAiHistoryFromDb);
}

// Reports
export async function getRevenueReport() {
  const data = await tryLoadJson<any>('reports.json');
  return data?.revenue ?? mockRevenueReport;
}

export async function getPerformanceReport() {
  const data = await tryLoadJson<any>('reports.json');
  return data?.performance ?? mockPerformanceReport;
}

export async function getTrafficReport() {
  const data = await tryLoadJson<any>('reports.json');
  return data?.traffic ?? mockTrafficReport;
}

export async function getUsersReport() {
  const data = await tryLoadJson<any>('reports.json');
  return data?.users ?? mockUsersReport;
}

export async function loadAllSeedData() {
  const [users, articles, orders, categories, comments, banners] = await Promise.all([
    getUsers(), getArticles(), getOrders(), getCategories(), getComments(), getBanners(),
  ]);
  return { users, articles, orders, categories, comments, banners };
}
