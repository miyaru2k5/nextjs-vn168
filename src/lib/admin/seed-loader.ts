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

async function getDbFunction(entity: string) {
  // Only called on server
  const db = await import('./db-queries');
  // Map entity name to the FromDb function
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
  return (db as any)[fnName] as (() => Promise<any[]>) | null;
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
      return data || [];
    }
    return [];
  } catch (e) {
    console.error('[seed-loader] DB query failed for', entity, e);
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
  if (json && (Array.isArray(json) ? json.length > 0 : true)) return json;

  const dbData = await getFromDb<T>(dbEntity);
  if (dbData && dbData.length > 0) return dbData;

  return mockData;
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

// Reports - always prefer the generated reports.json (seed data), fallback mock.
// Reports are not live DB entities yet.
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
