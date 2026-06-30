'use client';

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
} from '@/lib/seed';

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
 * React hooks backed by the unified data-loader.
 * Prefer generated seed-data JSON → API/DB → static mock.
 *
 * Usage:
 *   const { data: users, loading, error, refresh } = useUsers();
 */

export function useUsers(): UseDataResult<UserRecord[]> {
  return useData(() => getUsers(), mockUsers);
}

export function useArticles(): UseDataResult<ArticleRecord[]> {
  return useData(() => getArticles(), mockArticles);
}

export function useOrders(): UseDataResult<OrderRecord[]> {
  return useData(() => getOrders(), mockOrders);
}

export function useCategories(): UseDataResult<CategoryRecord[]> {
  return useData(() => getCategories(), mockCategories);
}

export function useComments(): UseDataResult<CommentRecord[]> {
  return useData(() => getComments(), mockComments);
}

export function useBanners(): UseDataResult<BannerRecord[]> {
  return useData(() => getBanners(), mockBanners);
}

export function useCustomers(): UseDataResult<CustomerRecord[]> {
  return useData(() => getCustomers(), mockCustomers);
}

export function useRoles(): UseDataResult<RoleRecord[]> {
  return useData(() => getRoles(), mockRoles);
}

export function useInvoices(): UseDataResult<InvoiceRecord[]> {
  return useData(() => getInvoices(), mockInvoices);
}

export function useApiKeys(): UseDataResult<ApiKeyRecord[]> {
  return useData(() => getApiKeys(), mockApiKeys);
}

export function useAiTools(): UseDataResult<AiToolRecord[]> {
  return useData(() => getAiTools(), mockAiTools);
}

export function useAiHistory(): UseDataResult<AiHistoryRecord[]> {
  return useData(() => getAiHistory(), mockAiHistory);
}

export function useRevenueReport(): UseDataResult<RevenueReportData> {
  return useData(() => getRevenueReport(), mockRevenueReport);
}

export function usePerformanceReport(): UseDataResult<PerformanceReportData> {
  return useData(() => getPerformanceReport(), mockPerformanceReport);
}

export function useTrafficReport(): UseDataResult<TrafficReportData> {
  return useData(() => getTrafficReport(), mockTrafficReport);
}

export function useUsersReport(): UseDataResult<UsersReportData> {
  return useData(() => getUsersReport(), mockUsersReport);
}

export function useNotifications(): UseDataResult<NotificationItem[]> {
  return useData(() => getNotifications(), mockNotifications);
}

export function useMessages(): UseDataResult<MessageItem[]> {
  return useData(() => getMessages(), mockMessages);
}

// Dashboard specific data — now prefers generated JSON from seeder (richer + consistent)
export function useDashboardStats() {
  return useData(() => getDashboardStats(), dashboardStats);
}

export function useRecentActivities() {
  return useData(() => getRecentActivities(), recentActivities);
}

// Chart data hooks (prefer JSON)
export function useRevenueChartData() {
  return useData(() => getRevenueChartData(), revenueChartData);
}
export function useUserGrowthData() {
  return useData(() => getUserGrowthData(), userGrowthData);
}
export function useTrafficSourceData() {
  return useData(() => getTrafficSourceData(), trafficSourceData);
}
export function useDeviceData() {
  return useData(() => getDeviceData(), deviceData);
}
export function useConversionData() {
  return useData(() => getConversionData(), conversionData);
}