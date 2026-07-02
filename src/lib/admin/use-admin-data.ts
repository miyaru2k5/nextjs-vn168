'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, useCallback } from 'react';
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
} from '@/lib/seed/mock-data';

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
} from './types';

type UseDataResult<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
};

// Generic Client-side API Fetcher
async function fetchFromApi<T>(type: string): Promise<T> {
  const res = await fetch(`/api/admin/data/${type}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${type} data from server`);
  }
  return res.json() as Promise<T>;
}

function useData<T>(fetcher: () => Promise<T>, fallback: T): UseDataResult<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetcher()
      .then((d) => {
        if (mounted) {
          setData(d);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          const e = err instanceof Error ? err : new Error(String(err));
          setError(e);
          setLoading(false);
        }
      });

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return { data, loading, error, refresh };
}

/**
 * React hooks backed by PostgreSQL / Mock Database API.
 * Always fetches from database via API routes.
 */

export function useUsers(): UseDataResult<UserRecord[]> {
  return useData(() => fetchFromApi<UserRecord[]>('users'), mockUsers);
}

export function useArticles(): UseDataResult<ArticleRecord[]> {
  return useData(() => fetchFromApi<ArticleRecord[]>('articles'), mockArticles);
}

export function useOrders(): UseDataResult<OrderRecord[]> {
  return useData(() => fetchFromApi<OrderRecord[]>('orders'), mockOrders);
}

export function useCategories(): UseDataResult<CategoryRecord[]> {
  return useData(() => fetchFromApi<CategoryRecord[]>('categories'), mockCategories);
}

export function useComments(): UseDataResult<CommentRecord[]> {
  return useData(() => fetchFromApi<CommentRecord[]>('comments'), mockComments);
}

export function useBanners(): UseDataResult<BannerRecord[]> {
  return useData(() => fetchFromApi<BannerRecord[]>('banners'), mockBanners);
}

export function useCustomers(): UseDataResult<CustomerRecord[]> {
  return useData(() => fetchFromApi<CustomerRecord[]>('customers'), mockCustomers);
}

export function useRoles(): UseDataResult<RoleRecord[]> {
  return useData(() => fetchFromApi<RoleRecord[]>('roles'), mockRoles);
}

export function useInvoices(): UseDataResult<InvoiceRecord[]> {
  return useData(() => fetchFromApi<InvoiceRecord[]>('invoices'), mockInvoices);
}

export function useApiKeys(): UseDataResult<ApiKeyRecord[]> {
  return useData(() => fetchFromApi<ApiKeyRecord[]>('api-keys'), mockApiKeys);
}

export function useAiTools(): UseDataResult<AiToolRecord[]> {
  return useData(() => fetchFromApi<AiToolRecord[]>('ai-tools'), mockAiTools);
}

export function useAiHistory(): UseDataResult<AiHistoryRecord[]> {
  return useData(() => fetchFromApi<AiHistoryRecord[]>('ai-history'), mockAiHistory);
}

export function useRevenueReport(): UseDataResult<RevenueReportData> {
  return useData(() => fetchFromApi<RevenueReportData>('revenue-report'), mockRevenueReport);
}

export function usePerformanceReport(): UseDataResult<PerformanceReportData> {
  return useData(() => fetchFromApi<PerformanceReportData>('performance-report'), mockPerformanceReport);
}

export function useTrafficReport(): UseDataResult<TrafficReportData> {
  return useData(() => fetchFromApi<TrafficReportData>('traffic-report'), mockTrafficReport);
}

export function useUsersReport(): UseDataResult<UsersReportData> {
  return useData(() => fetchFromApi<UsersReportData>('users-report'), mockUsersReport);
}

export function useNotifications(): UseDataResult<NotificationItem[]> {
  return useData(() => fetchFromApi<NotificationItem[]>('notifications'), mockNotifications);
}

export function useMessages(): UseDataResult<MessageItem[]> {
  return useData(() => fetchFromApi<MessageItem[]>('messages'), mockMessages);
}

export function useDashboardStats() {
  return useData(() => fetchFromApi<any[]>('dashboard-stats'), dashboardStats);
}

export function useRecentActivities() {
  return useData(() => fetchFromApi<any[]>('recent-activities'), recentActivities);
}

export function useRevenueChartData() {
  return useData(() => fetchFromApi<any[]>('revenue-chart'), revenueChartData);
}

export function useUserGrowthData() {
  return useData(() => fetchFromApi<any[]>('user-growth'), userGrowthData);
}

export function useTrafficSourceData() {
  return useData(() => fetchFromApi<any[]>('traffic-source'), trafficSourceData);
}

export function useDeviceData() {
  return useData(() => fetchFromApi<any[]>('device-data'), deviceData);
}

export function useConversionData() {
  return useData(() => fetchFromApi<any[]>('conversion-data'), conversionData);
}