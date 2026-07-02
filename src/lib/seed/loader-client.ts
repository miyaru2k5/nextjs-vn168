/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Client-safe data loader (browser + client-component SSR).
 * Uses fetch/API/mock only — never imports fs, pg, or server-only modules.
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
  mockNotifications,
  mockMessages,
  dashboardStats,
  recentActivities,
  revenueChartData,
  userGrowthData,
  trafficSourceData,
  deviceData,
  conversionData,
} from './mock-data';

import type {
  UserRecord,
  ArticleRecord,
  OrderRecord,
  CategoryRecord,
  CommentRecord,
  BannerRecord,
  CustomerRecord,
  RoleRecord,
  InvoiceRecord,
  ApiKeyRecord,
  AiToolRecord,
  AiHistoryRecord,
  RevenueReportData,
  PerformanceReportData,
  TrafficReportData,
  UsersReportData,
  NotificationItem,
  MessageItem,
} from '../admin/types';

import { getResolvedDataSource, type DataSourceMode } from './config';

const SEED_BASE = '/seed-data';
const API_BASE = '/api/admin/data';

async function tryLoadJson<T>(filename: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${SEED_BASE}/${filename}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {
    // ignore
  }
  return null;
}

async function fetchFromApi<T>(type: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${API_BASE}/${type}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {
    // ignore
  }
  return null;
}

async function getFromDb<T>(entity: string): Promise<T[]> {
  const data = await fetchFromApi<T>(entity);
  return data ?? [];
}

async function resolve<T>(
  jsonFile: string,
  mockData: T[],
  dbEntity?: string,
  modeOverride?: DataSourceMode
): Promise<T[]> {
  const mode = modeOverride || getResolvedDataSource();

  if (mode === 'json') {
    const json = await tryLoadJson<T>(jsonFile);
    return json ?? mockData;
  }

  if (mode === 'mock') {
    return mockData;
  }

  if (mode === 'db' && dbEntity) {
    const dbData = await getFromDb<T>(dbEntity);
    return dbData && dbData.length > 0 ? dbData : mockData;
  }

  const json = await tryLoadJson<T>(jsonFile);
  if (json && json.length > 0) return json;

  if (dbEntity) {
    const dbData = await getFromDb<T>(dbEntity);
    if (dbData && dbData.length > 0) return dbData;
  }

  return mockData;
}

type ReportsJson = {
  revenue?: RevenueReportData;
  performance?: PerformanceReportData;
  traffic?: TrafficReportData;
  users?: UsersReportData;
};

export type DataLoaderOptions = {
  dataSource?: DataSourceMode;
};

export interface DataLoader {
  getUsers(): Promise<UserRecord[]>;
  getArticles(): Promise<ArticleRecord[]>;
  getOrders(): Promise<OrderRecord[]>;
  getCategories(): Promise<CategoryRecord[]>;
  getComments(): Promise<CommentRecord[]>;
  getBanners(): Promise<BannerRecord[]>;
  getCustomers(): Promise<CustomerRecord[]>;
  getRoles(): Promise<RoleRecord[]>;
  getInvoices(): Promise<InvoiceRecord[]>;
  getApiKeys(): Promise<ApiKeyRecord[]>;
  getAiTools(): Promise<AiToolRecord[]>;
  getAiHistory(): Promise<AiHistoryRecord[]>;
  getRevenueReport(): Promise<RevenueReportData>;
  getPerformanceReport(): Promise<PerformanceReportData>;
  getTrafficReport(): Promise<TrafficReportData>;
  getUsersReport(): Promise<UsersReportData>;
  getNotifications(): Promise<NotificationItem[]>;
  getMessages(): Promise<MessageItem[]>;
  getDashboardStats(): Promise<any[]>;
  getRevenueChartData(): Promise<any[]>;
  getUserGrowthData(): Promise<any[]>;
  getTrafficSourceData(): Promise<any[]>;
  getDeviceData(): Promise<any[]>;
  getConversionData(): Promise<any[]>;
  getRecentActivities(): Promise<any[]>;
  loadAllSeedData(): Promise<{
    users: UserRecord[];
    articles: ArticleRecord[];
    orders: OrderRecord[];
    categories: CategoryRecord[];
    comments: CommentRecord[];
    banners: BannerRecord[];
  }>;
}

function createLoader(modeOverride?: DataSourceMode): DataLoader {
  const resolveWithMode = <T>(jsonFile: string, mockData: T[], dbEntity?: string) =>
    resolve(jsonFile, mockData, dbEntity, modeOverride);

  const getMode = () => modeOverride || getResolvedDataSource();

  const getRolesWithMode = async (): Promise<RoleRecord[]> => {
    const m = getMode();
    if (m === 'mock') return mockRoles;
    const json = await tryLoadJson<RoleRecord>('roles.json');
    return json ?? mockRoles;
  };

  const getNotificationsWithMode = async (): Promise<NotificationItem[]> => {
    const m = getMode();
    if (m === 'mock') return mockNotifications;
    const json = await tryLoadJson<NotificationItem>('notifications.json');
    return json && json.length > 0 ? json : mockNotifications;
  };

  const getMessagesWithMode = async (): Promise<MessageItem[]> => {
    const m = getMode();
    if (m === 'mock') return mockMessages;
    const json = await tryLoadJson<MessageItem>('messages.json');
    return json && json.length > 0 ? json : mockMessages;
  };

  const tryLoadReportsWithMode = async (): Promise<ReportsJson | null> => {
    const m = getMode();
    if (m === 'mock') return null;
    try {
      const res = await fetch(`${SEED_BASE}/reports.json`, { cache: 'no-store' });
      if (res.ok) return await res.json() as ReportsJson;
    } catch {}
    return null;
  };

  const getDashboardWithMode = async (file: string, fallback: any[]) => {
    const m = getMode();
    if (m === 'mock') return fallback;
    const json = await tryLoadJson<any>(file);
    return json && json.length > 0 ? json : fallback;
  };

  return {
    getUsers: () => resolveWithMode('users.json', mockUsers, 'users'),
    getArticles: () => resolveWithMode('articles.json', mockArticles, 'articles'),
    getOrders: () => resolveWithMode('orders.json', mockOrders, 'orders'),
    getCategories: () => resolveWithMode('categories.json', mockCategories, 'categories'),
    getComments: () => resolveWithMode('comments.json', mockComments, 'comments'),
    getBanners: () => resolveWithMode('banners.json', mockBanners, 'banners'),
    getCustomers: () => resolveWithMode('customers.json', mockCustomers, 'customers'),
    getRoles: getRolesWithMode,
    getInvoices: () => resolveWithMode('invoices.json', mockInvoices, 'invoices'),
    getApiKeys: () => resolveWithMode('api-keys.json', mockApiKeys, 'api-keys'),
    getAiTools: () => resolveWithMode('ai-tools.json', mockAiTools, 'ai-tools'),
    getAiHistory: () => resolveWithMode('ai-history.json', mockAiHistory, 'ai-history'),

    getRevenueReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.revenue ?? mockRevenueReport;
    },
    getPerformanceReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.performance ?? mockPerformanceReport;
    },
    getTrafficReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.traffic ?? mockTrafficReport;
    },
    getUsersReport: async () => {
      const data = await tryLoadReportsWithMode();
      return data?.users ?? mockUsersReport;
    },

    getNotifications: getNotificationsWithMode,
    getMessages: getMessagesWithMode,

    getDashboardStats: () => getDashboardWithMode('dashboard-stats.json', dashboardStats),
    getRevenueChartData: () => getDashboardWithMode('revenue-chart.json', revenueChartData),
    getUserGrowthData: () => getDashboardWithMode('user-growth.json', userGrowthData),
    getTrafficSourceData: () => getDashboardWithMode('traffic-source.json', trafficSourceData),
    getDeviceData: () => getDashboardWithMode('device-data.json', deviceData),
    getConversionData: () => getDashboardWithMode('conversion-data.json', conversionData),
    getRecentActivities: () => getDashboardWithMode('recent-activities.json', recentActivities),

    loadAllSeedData: async () => {
      const [users, articles, orders, categories, comments, banners] = await Promise.all([
        resolveWithMode('users.json', mockUsers, 'users'),
        resolveWithMode('articles.json', mockArticles, 'articles'),
        resolveWithMode('orders.json', mockOrders, 'orders'),
        resolveWithMode('categories.json', mockCategories, 'categories'),
        resolveWithMode('comments.json', mockComments, 'comments'),
        resolveWithMode('banners.json', mockBanners, 'banners'),
      ]);
      return { users, articles, orders, categories, comments, banners };
    },
  };
}

export const dataLoader: DataLoader = createLoader();

export function createDataLoader(options: DataLoaderOptions = {}): DataLoader {
  return createLoader(options.dataSource);
}

export const {
  getUsers,
  getArticles,
  getOrders,
  getCategories,
  getComments,
  getBanners,
  getCustomers,
  getRoles,
  getInvoices,
  getApiKeys,
  getAiTools,
  getAiHistory,
  getRevenueReport,
  getPerformanceReport,
  getTrafficReport,
  getUsersReport,
  getNotifications,
  getMessages,
  getDashboardStats,
  getRevenueChartData,
  getUserGrowthData,
  getTrafficSourceData,
  getDeviceData,
  getConversionData,
  getRecentActivities,
  loadAllSeedData,
} = dataLoader;