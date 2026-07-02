/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import * as dbQueries from '@/lib/admin/db-queries';
import * as mockData from '@/lib/seed/mock-data';

// Map entity name to the right getter
type GetterFn = () => Promise<unknown>;

const getters: Record<string, GetterFn> = {
  // DB Queries (PostgreSQL via Drizzle)
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

  // Fallbacks / Auxiliary entities not modeled in DB yet
  customers: async () => mockData.mockCustomers,
  roles: async () => mockData.mockRoles,
  'revenue-report': async () => mockData.mockRevenueReport,
  'performance-report': async () => mockData.mockPerformanceReport,
  'traffic-report': async () => mockData.mockTrafficReport,
  'users-report': async () => mockData.mockUsersReport,
  notifications: async () => mockData.mockNotifications,
  messages: async () => mockData.mockMessages,
  
  // Dashboard Specific Analytics
  'dashboard-stats': async () => mockData.dashboardStats,
  'revenue-chart': async () => mockData.revenueChartData,
  'user-growth': async () => mockData.userGrowthData,
  'traffic-source': async () => mockData.trafficSourceData,
  'device-data': async () => mockData.deviceData,
  'conversion-data': async () => mockData.conversionData,
  'recent-activities': async () => mockData.recentActivities,
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const getter = getters[type];

  if (getter) {
    try {
      const data = await getter();
      return NextResponse.json(data);
    } catch (err: any) {
      console.error(`[API Route] Failed to get data for ${type}:`, err.message);
      return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: `Unknown data type: ${type}` }, { status: 404 });
}