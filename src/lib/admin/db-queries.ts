/**
 * Real Database Queries using Drizzle
 * 
 * These are server-only functions.
 * Used when DATA_SOURCE = 'db' or auto resolves to db.
 */

import { db } from '@/db';
import { 
  users, 
  articles, 
  categories, 
  comments, 
  orders, 
  banners, 
  jobs 
} from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

// Types are re-exported from mock-data for consistency
import type { 
  UserRecord, 
  ArticleRecord, 
  CategoryRecord, 
  CommentRecord, 
  OrderRecord, 
  BannerRecord 
} from './mock-data';

/**
 * Helper to safely map DB rows to our frontend Record shapes.
 * Adjust field names as schema evolves.
 */
function mapUser(row: any): UserRecord {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: row.role,
    status: row.status,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : '',
    avatar: row.avatar || undefined,
  };
}

function mapArticle(row: any): ArticleRecord {
  return {
    id: String(row.id),
    title: row.title,
    category: row.category?.name || 'Uncategorized', // if relation loaded
    author: row.author,
    status: row.status,
    views: row.views || 0,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : '',
  };
}

function mapCategory(row: any): CategoryRecord {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    parent: row.parent || null,
    articles: 0, // can be counted in future
    status: row.status || 'active',
  };
}

function mapOrder(row: any): OrderRecord {
  return {
    id: row.orderNumber || `ORD-${row.id}`,
    customer: row.customerName,
    email: row.customerEmail,
    package: row.packageName,
    amount: row.amount,
    status: row.status,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : '',
  };
}

function mapComment(row: any): CommentRecord {
  return {
    id: String(row.id),
    author: row.authorName,
    content: row.content,
    article: '', // would need join
    status: row.status,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : '',
  };
}

function mapBanner(row: any): BannerRecord {
  return {
    id: String(row.id),
    title: row.title,
    position: row.position,
    image: row.image,
    status: row.status,
    startDate: row.startDate ? new Date(row.startDate).toISOString().split('T')[0] : '',
    endDate: row.endDate ? new Date(row.endDate).toISOString().split('T')[0] : '',
  };
}

export async function getUsersFromDb(): Promise<UserRecord[]> {
  try {
    const rows = await db.select().from(users).orderBy(desc(users.createdAt)).limit(100);
    return rows.map(mapUser);
  } catch (e) {
    console.error('[db-queries] getUsersFromDb failed', e);
    return [];
  }
}

export async function getArticlesFromDb(): Promise<ArticleRecord[]> {
  try {
    // Simple select. For better category name, would join.
    const rows = await db.select().from(articles).orderBy(desc(articles.createdAt)).limit(100);
    return rows.map(mapArticle);
  } catch (e) {
    console.error('[db-queries] getArticlesFromDb failed', e);
    return [];
  }
}

export async function getCategoriesFromDb(): Promise<CategoryRecord[]> {
  try {
    const rows = await db.select().from(categories).orderBy(categories.name);
    return rows.map(mapCategory);
  } catch (e) {
    console.error('[db-queries] getCategoriesFromDb failed', e);
    return [];
  }
}

export async function getOrdersFromDb(): Promise<OrderRecord[]> {
  try {
    const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100);
    return rows.map(mapOrder);
  } catch (e) {
    console.error('[db-queries] getOrdersFromDb failed', e);
    return [];
  }
}

export async function getCommentsFromDb(): Promise<CommentRecord[]> {
  try {
    const rows = await db.select().from(comments).orderBy(desc(comments.createdAt)).limit(100);
    return rows.map(mapComment);
  } catch (e) {
    console.error('[db-queries] getCommentsFromDb failed', e);
    return [];
  }
}

export async function getBannersFromDb(): Promise<BannerRecord[]> {
  try {
    const rows = await db.select().from(banners);
    return rows.map(mapBanner);
  } catch (e) {
    console.error('[db-queries] getBannersFromDb failed', e);
    return [];
  }
}

// Placeholder for entities without full schema yet (payments, AI tools)
// They can fall back or be added to schema later.
export async function getInvoicesFromDb() {
  console.warn('[db-queries] Invoices table not in schema yet. Returning empty.');
  return [];
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
