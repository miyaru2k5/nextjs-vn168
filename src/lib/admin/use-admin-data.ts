'use client';

import { useEffect, useState, useCallback } from 'react';
import {
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
  type RevenueReportData,
  type PerformanceReportData,
  type TrafficReportData,
  type UsersReportData,
  mockRevenueReport,
  mockPerformanceReport,
  mockTrafficReport,
  mockUsersReport,
} from './mock-data';
import {
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
} from './seed-client';

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
 * React hooks that prefer generated seed-data JSON (when SEED_TO_JSON was used)
 * over the static mock arrays.
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