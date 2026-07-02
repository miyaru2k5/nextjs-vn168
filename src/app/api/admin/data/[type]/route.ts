import { NextRequest, NextResponse } from 'next/server';
import { getResolvedDataSource } from '@/lib/seed';
import * as dbQueries from '@/lib/admin/db-queries';
import * as dataLoader from '@/lib/seed/loader';

// Map entity name to the right getter
type GetterFn = () => Promise<unknown[]>;

const getters: Record<string, GetterFn> = {
  users: dbQueries.getUsersFromDb,
  articles: dbQueries.getArticlesFromDb,
  categories: dbQueries.getCategoriesFromDb,
  orders: dbQueries.getOrdersFromDb,
  comments: dbQueries.getCommentsFromDb,
  banners: dbQueries.getBannersFromDb,
  invoices: dbQueries.getInvoicesFromDb,
  'api-keys': dbQueries.getApiKeysFromDb,
  'ai-tools': dbQueries.getAiToolsFromDb,
  'ai-history': dbQueries.getAiHistoryFromDb,
};

function capitalizeEntity(type: string): string {
  // Convert kebab-case to PascalCase, e.g. "api-keys" -> "ApiKeys"
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const mode = getResolvedDataSource();

  // In production or db mode we prefer real data
  if (mode === 'db') {
    const getter = getters[type];
    if (getter) {
      const data = await getter();
      return NextResponse.json(data);
    }
  }

  // Fallback to the unified loader (which respects JSON / mock)
  const loaderFnName = `get${capitalizeEntity(type)}`;
  type SeedLoader = Record<string, (...args: unknown[]) => Promise<unknown>>;
  const loaderFn = (dataLoader as unknown as SeedLoader)[loaderFnName];
  if (typeof loaderFn === 'function') {
    try {
      const data = await loaderFn();
      return NextResponse.json(data);
    } catch {
      // fall through
    }
  }

  return NextResponse.json([], { status: 404 });
}