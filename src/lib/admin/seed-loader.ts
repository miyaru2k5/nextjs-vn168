/**
 * Seed Data Loader
 * 
 * When you run the seeder with SEED_TO_JSON=true (or it auto-runs in dev),
 * this loader will prefer the generated JSON files from:
 *   - public/seed-data/*.json   (accessible via fetch in browser)
 *   - seed-data/*.json          (server side)
 *
 * Falls back to the static mocks in mock-data.ts if no seed files exist.
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

// In browser we can only reliably fetch from /seed-data
const SEED_BASE = '/seed-data';

async function tryLoadJson<T>(filename: string): Promise<T[] | null> {
  // Only attempt in browser or when we have window
  if (typeof window === 'undefined') {
    // Server-side: try fs read (for API routes / server components)
    try {
      // Dynamic import to avoid bundling fs on client
      const fs = await import('fs');
      const path = await import('path');

      const privatePath = path.join(process.cwd(), 'seed-data', filename);
      if (fs.existsSync(privatePath)) {
        const content = fs.readFileSync(privatePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch {
      // ignore - fall through to fetch or mock
    }
    return null;
  }

  // Client-side fetch from public
  try {
    const res = await fetch(`${SEED_BASE}/${filename}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // network error or file not found → fall back
  }
  return null;
}

export async function getUsers(): Promise<UserRecord[]> {
  const data = await tryLoadJson<UserRecord>('users.json');
  return data ?? mockUsers;
}

export async function getArticles(): Promise<ArticleRecord[]> {
  const data = await tryLoadJson<ArticleRecord>('articles.json');
  return data ?? mockArticles;
}

export async function getOrders(): Promise<OrderRecord[]> {
  const data = await tryLoadJson<OrderRecord>('orders.json');
  return data ?? mockOrders;
}

export async function getCategories(): Promise<CategoryRecord[]> {
  const data = await tryLoadJson<CategoryRecord>('categories.json');
  return data ?? mockCategories;
}

export async function getComments(): Promise<CommentRecord[]> {
  const data = await tryLoadJson<CommentRecord>('comments.json');
  return data ?? mockComments;
}

export async function getBanners(): Promise<BannerRecord[]> {
  const data = await tryLoadJson<BannerRecord>('banners.json');
  return data ?? mockBanners;
}

export async function getCustomers(): Promise<CustomerRecord[]> {
  const data = await tryLoadJson<CustomerRecord>('customers.json');
  return data ?? mockCustomers;
}

export async function getRoles(): Promise<RoleRecord[]> {
  // Roles are mostly static, but we still allow override via roles.json if user generates one
  const data = await tryLoadJson<RoleRecord>('roles.json');
  return data ?? mockRoles;
}

export async function getInvoices(): Promise<InvoiceRecord[]> {
  const data = await tryLoadJson<InvoiceRecord>('invoices.json');
  return data ?? mockInvoices;
}

export async function getApiKeys(): Promise<ApiKeyRecord[]> {
  // Note: filename uses 'api-keys' to match seed output
  const data = await tryLoadJson<ApiKeyRecord>('api-keys.json');
  return data ?? mockApiKeys;
}

export async function getAiTools(): Promise<AiToolRecord[]> {
  const data = await tryLoadJson<AiToolRecord>('ai-tools.json');
  return data ?? mockAiTools;
}

export async function getAiHistory(): Promise<AiHistoryRecord[]> {
  const data = await tryLoadJson<AiHistoryRecord>('ai-history.json');
  return data ?? mockAiHistory;
}

// Convenience: load multiple at once
export async function loadAllSeedData() {
  const [users, articles, orders, categories, comments, banners] = await Promise.all([
    getUsers(),
    getArticles(),
    getOrders(),
    getCategories(),
    getComments(),
    getBanners(),
  ]);

  return { users, articles, orders, categories, comments, banners };
}
