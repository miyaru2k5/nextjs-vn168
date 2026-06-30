'use client';

import { useEffect, useState } from 'react';
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

/**
 * React hooks that prefer generated seed-data JSON (when SEED_TO_JSON was used)
 * over the static mock arrays.
 *
 * Usage:
 *   const users = useUsers();
 *   const articles = useArticles();
 */

export function useUsers() {
  const [data, setData] = useState<UserRecord[]>(mockUsers);

  useEffect(() => {
    let mounted = true;
    getUsers().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useArticles() {
  const [data, setData] = useState<ArticleRecord[]>(mockArticles);

  useEffect(() => {
    let mounted = true;
    getArticles().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useOrders() {
  const [data, setData] = useState<OrderRecord[]>(mockOrders);

  useEffect(() => {
    let mounted = true;
    getOrders().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useCategories() {
  const [data, setData] = useState<CategoryRecord[]>(mockCategories);

  useEffect(() => {
    let mounted = true;
    getCategories().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useComments() {
  const [data, setData] = useState<CommentRecord[]>(mockComments);

  useEffect(() => {
    let mounted = true;
    getComments().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useBanners() {
  const [data, setData] = useState<BannerRecord[]>(mockBanners);

  useEffect(() => {
    let mounted = true;
    getBanners().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useCustomers() {
  const [data, setData] = useState<CustomerRecord[]>(mockCustomers);

  useEffect(() => {
    let mounted = true;
    getCustomers().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useRoles() {
  const [data, setData] = useState<RoleRecord[]>(mockRoles);

  useEffect(() => {
    let mounted = true;
    getRoles().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useInvoices() {
  const [data, setData] = useState<InvoiceRecord[]>(mockInvoices);

  useEffect(() => {
    let mounted = true;
    getInvoices().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useApiKeys() {
  const [data, setData] = useState<ApiKeyRecord[]>(mockApiKeys);

  useEffect(() => {
    let mounted = true;
    getApiKeys().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useAiTools() {
  const [data, setData] = useState<AiToolRecord[]>(mockAiTools);

  useEffect(() => {
    let mounted = true;
    getAiTools().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useAiHistory() {
  const [data, setData] = useState<AiHistoryRecord[]>(mockAiHistory);

  useEffect(() => {
    let mounted = true;
    getAiHistory().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useRevenueReport() {
  const [data, setData] = useState<RevenueReportData>(mockRevenueReport);

  useEffect(() => {
    let mounted = true;
    getRevenueReport().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function usePerformanceReport() {
  const [data, setData] = useState<PerformanceReportData>(mockPerformanceReport);

  useEffect(() => {
    let mounted = true;
    getPerformanceReport().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useTrafficReport() {
  const [data, setData] = useState<TrafficReportData>(mockTrafficReport);

  useEffect(() => {
    let mounted = true;
    getTrafficReport().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}

export function useUsersReport() {
  const [data, setData] = useState<UsersReportData>(mockUsersReport);

  useEffect(() => {
    let mounted = true;
    getUsersReport().then((d) => {
      if (mounted) setData(d);
    });
    return () => { mounted = false; };
  }, []);

  return data;
}
