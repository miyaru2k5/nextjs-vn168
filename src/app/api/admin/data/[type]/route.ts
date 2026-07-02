/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import * as dbQueries from '@/lib/admin/db-queries';
import * as mockData from '@/lib/seed/mock-data';
import { checkDatabaseConnection, isDatabaseAvailable } from '@/db';

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
    const isDbBacked = [
      'users', 'articles', 'categories', 'orders', 'comments', 'banners', 'invoices'
    ].includes(type);

    if (isDbBacked) {
      // Proactively run the health check (it is cached after first run)
      await checkDatabaseConnection();

      if (isDatabaseAvailable() === false) {
        const mockFallback = getMockFallback(type);
        if (mockFallback) {
          return NextResponse.json(mockFallback);
        }
      }
    }

    try {
      const data = await getter();

      // Post-check fallback if somehow a DB query returned empty after failure
      if (isDbBacked && (!data || (Array.isArray(data) && data.length === 0)) && isDatabaseAvailable() === false) {
        const mockFallback = getMockFallback(type);
        if (mockFallback) return NextResponse.json(mockFallback);
      }

      return NextResponse.json(data);
    } catch (err: any) {
      console.error(`[API Route] Failed to get data for ${type}:`, err.message);

      // Always try mock fallback on error for known entities
      const mockFallback = getMockFallback(type);
      if (mockFallback) {
        return NextResponse.json(mockFallback);
      }

      return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: `Unknown data type: ${type}` }, { status: 404 });
}

// Helper to map DB entity to its mock equivalent
function getMockFallback(type: string): unknown | null {
  switch (type) {
    case 'users': return mockData.mockUsers;
    case 'articles': return mockData.mockArticles;
    case 'categories': return mockData.mockCategories;
    case 'orders': return mockData.mockOrders;
    case 'comments': return mockData.mockComments;
    case 'banners': return mockData.mockBanners;
    case 'invoices': return mockData.mockInvoices;
    case 'customers': return mockData.mockCustomers;
    case 'roles': return mockData.mockRoles;
    case 'api-keys': return mockData.mockApiKeys;
    case 'ai-tools': return mockData.mockAiTools;
    case 'ai-history': return mockData.mockAiHistory;
    case 'revenue-report': return mockData.mockRevenueReport;
    case 'performance-report': return mockData.mockPerformanceReport;
    case 'traffic-report': return mockData.mockTrafficReport;
    case 'users-report': return mockData.mockUsersReport;
    case 'notifications': return mockData.mockNotifications;
    case 'messages': return mockData.mockMessages;
    case 'dashboard-stats': return mockData.dashboardStats;
    case 'revenue-chart': return mockData.revenueChartData;
    case 'user-growth': return mockData.userGrowthData;
    case 'traffic-source': return mockData.trafficSourceData;
    case 'device-data': return mockData.deviceData;
    case 'conversion-data': return mockData.conversionData;
    case 'recent-activities': return mockData.recentActivities;
    default: return null;
  }
}