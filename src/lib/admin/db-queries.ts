/**
 * Real Database Queries using Drizzle
 * 
 * These are server-only functions.
 * Used when DATA_SOURCE = 'db' or auto resolves to db.
 * 
 * NOTE: No 'server-only' guard here because this file is imported dynamically
 * from loader.ts which is used by client components. The runtime guard
 * (typeof window === 'undefined') in loader.ts ensures this never executes client-side.
 * The 'server-only' guard on src/db/index.ts provides the real safety net.
 */

import { db, checkDatabaseConnection, isDatabaseAvailable } from '@/db';
import { 
  users, 
  articles, 
  categories, 
  comments, 
  orders, 
  banners, 
  invoices,
} from '@/db/schema';
import { desc } from 'drizzle-orm';

// Types centralized in types.ts
import type { 
  UserRecord, 
  ArticleRecord, 
  CategoryRecord, 
  CommentRecord, 
  OrderRecord, 
  BannerRecord,
  InvoiceRecord,
} from './types';

type DbRow = Record<string, unknown>;

/**
 * Helper to safely map DB rows to our frontend Record shapes.
 * Adjust field names as schema evolves.
 */
function mapUser(row: DbRow): UserRecord {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    role: String(row.role ?? ''),
    status: (row.status as UserRecord['status']) ?? 'active',
    createdAt: row.createdAt ? new Date(String(row.createdAt)).toISOString().split('T')[0] : '',
    avatar: row.avatar ? String(row.avatar) : undefined,
  };
}

function mapArticle(row: DbRow): ArticleRecord {
  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    category: (row.category as { name?: string })?.name || 'Uncategorized',
    author: String(row.author ?? ''),
    status: (row.status as ArticleRecord['status']) ?? 'draft',
    views: (row.views as number) || 0,
    createdAt: row.createdAt ? new Date(String(row.createdAt)).toISOString().split('T')[0] : '',
  };
}

function mapCategory(row: DbRow): CategoryRecord {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    slug: String(row.slug ?? ''),
    parent: row.parent ? String(row.parent) : null,
    articles: 0,
    status: (row.status as CategoryRecord['status']) ?? 'active',
  };
}

function mapOrder(row: DbRow): OrderRecord {
  return {
    id: row.orderNumber ? String(row.orderNumber) : `ORD-${row.id}`,
    customer: String(row.customerName ?? ''),
    email: String(row.customerEmail ?? ''),
    package: String(row.packageName ?? ''),
    amount: (row.amount as number) ?? 0,
    status: (row.status as OrderRecord['status']) ?? 'pending',
    createdAt: row.createdAt ? new Date(String(row.createdAt)).toISOString().split('T')[0] : '',
  };
}

function mapComment(row: DbRow): CommentRecord {
  return {
    id: String(row.id),
    author: String(row.authorName ?? ''),
    content: String(row.content ?? ''),
    article: '',
    status: (row.status as CommentRecord['status']) ?? 'pending',
    createdAt: row.createdAt ? new Date(String(row.createdAt)).toISOString().split('T')[0] : '',
  };
}

function mapBanner(row: DbRow): BannerRecord {
  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    position: String(row.position ?? ''),
    image: String(row.image ?? ''),
    status: (row.status as BannerRecord['status']) ?? 'inactive',
    startDate: row.startDate ? new Date(String(row.startDate)).toISOString().split('T')[0] : '',
    endDate: row.endDate ? new Date(String(row.endDate)).toISOString().split('T')[0] : '',
  };
}

function mapInvoice(row: DbRow): InvoiceRecord {
  return {
    id: row.invoiceNumber ? String(row.invoiceNumber) : `INV-${row.id}`,
    customer: String(row.customerName ?? ''),
    amount: (row.amount as number) ?? 0,
    status: (row.status as InvoiceRecord['status']) ?? 'pending',
    date: row.date ? new Date(String(row.date)).toISOString().split('T')[0] : '',
  };
}

export async function getUsersFromDb(): Promise<UserRecord[]> {
  // Fast path: if we already know DB is unavailable, skip immediately
  if (isDatabaseAvailable() === false) {
    return [];
  }

  // Perform initial connection check (cached after first call)
  const available = await checkDatabaseConnection();
  if (!available) {
    return [];
  }

  try {
    const rows = await db.select().from(users).orderBy(desc(users.createdAt)).limit(100);
    return rows.map(mapUser);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getUsersFromDb failed', err);
    }
    return [];
  }
}

export async function getArticlesFromDb(): Promise<ArticleRecord[]> {
  if (isDatabaseAvailable() === false) return [];
  const available = await checkDatabaseConnection();
  if (!available) return [];

  try {
    const rows = await db.select().from(articles).orderBy(desc(articles.createdAt)).limit(100);
    return rows.map(mapArticle);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getArticlesFromDb failed', err);
    }
    return [];
  }
}

export async function getCategoriesFromDb(): Promise<CategoryRecord[]> {
  if (isDatabaseAvailable() === false) return [];
  const available = await checkDatabaseConnection();
  if (!available) return [];

  try {
    const rows = await db.select().from(categories).orderBy(categories.name);
    return rows.map(mapCategory);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getCategoriesFromDb failed', err);
    }
    return [];
  }
}

export async function getOrdersFromDb(): Promise<OrderRecord[]> {
  if (isDatabaseAvailable() === false) return [];
  const available = await checkDatabaseConnection();
  if (!available) return [];

  try {
    const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100);
    return rows.map(mapOrder);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getOrdersFromDb failed', err);
    }
    return [];
  }
}

export async function getCommentsFromDb(): Promise<CommentRecord[]> {
  if (isDatabaseAvailable() === false) return [];
  const available = await checkDatabaseConnection();
  if (!available) return [];

  try {
    const rows = await db.select().from(comments).orderBy(desc(comments.createdAt)).limit(100);
    return rows.map(mapComment);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getCommentsFromDb failed', err);
    }
    return [];
  }
}

export async function getBannersFromDb(): Promise<BannerRecord[]> {
  if (isDatabaseAvailable() === false) return [];
  const available = await checkDatabaseConnection();
  if (!available) return [];

  try {
    const rows = await db.select().from(banners);
    return rows.map(mapBanner);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getBannersFromDb failed', err);
    }
    return [];
  }
}

export async function getInvoicesFromDb(): Promise<InvoiceRecord[]> {
  if (isDatabaseAvailable() === false) return [];
  const available = await checkDatabaseConnection();
  if (!available) return [];

  try {
    const rows = await db.select().from(invoices).orderBy(desc(invoices.createdAt)).limit(100);
    return rows.map(mapInvoice);
  } catch (err) {
    if (isDatabaseAvailable() !== false) {
      console.error('[db-queries] getInvoicesFromDb failed', err);
    }
    return [];
  }
}

export async function getApiKeysFromDb() {
  console.warn('[db-queries] API keys not modeled in DB yet.');
  return [];
}

export async function getAiToolsFromDb() {
  console.warn('[db-queries] AI tools are currently config/static.');
  return [];
}

export async function getAiHistoryFromDb() {
  console.warn('[db-queries] AI usage history not yet in schema.');
  return [];
}