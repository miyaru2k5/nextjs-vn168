import { NextRequest, NextResponse } from 'next/server';
import { getResolvedDataSource } from '@/lib/admin/data-config';
import * as dbQueries from '@/lib/admin/db-queries';
import * as seedLoader from '@/lib/admin/seed-loader';

// Map entity name to the right getter
const getters: Record<string, () => Promise<any[]>> = {
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

export async function GET(
  req: NextRequest,
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
  // This keeps behavior consistent
  try {
    // @ts-ignore - dynamic
    const loaderFn = (seedLoader as any)[`get${type.charAt(0).toUpperCase() + type.slice(1).replace(/-./g, (x) => x[1].toUpperCase())}`];
    if (loaderFn) {
      const data = await loaderFn();
      return NextResponse.json(data);
    }
  } catch {}

  return NextResponse.json([], { status: 404 });
}
