/**
 * Admin Domain Types
 *
 * Centralized type definitions for admin data records and reports.
 *
 * Import types from here:
 *   import type { UserRecord, OrderRecord } from '@/lib/admin/types'
 */

// ======================
// Core Entity Records (used by DataTable, loaders, DB mappers)
// ======================

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'locked';
  createdAt: string;
  avatar?: string;
};

export type ArticleRecord = {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled';
  views: number;
  createdAt: string;
};

export type OrderRecord = {
  id: string;
  customer: string;
  email: string;
  package: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  createdAt: string;
};

export type RoleRecord = {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: number;
  createdAt: string;
};

export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  articles: number;
  status: 'active' | 'inactive';
};

export type CommentRecord = {
  id: string;
  author: string;
  content: string;
  article: string;
  status: 'approved' | 'pending' | 'hidden' | 'reported';
  createdAt: string;
};

export type BannerRecord = {
  id: string;
  title: string;
  position: string;
  image: string;
  status: 'active' | 'inactive' | 'scheduled';
  startDate: string;
  endDate: string;
};

export type CustomerRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinedAt: string;
};

// ======================
// Payments / AI / Reports
// ======================

export type InvoiceRecord = {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
};

export type ApiKeyRecord = {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'revoked';
  createdAt: string;
  lastUsed: string;
};

export type AiToolRecord = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  usage: number;
  tokens: string;
};

export type AiHistoryRecord = {
  id: string;
  user: string;
  tool: string;
  tokens: number;
  duration: string;
  createdAt: string;
};

// Report shapes (used by report pages + seed JSON)
export type RevenueReportData = {
  monthlyRevenue: number;
  yearlyRevenue: number;
  arpu: number;
  refundRate: number;
  changeMonthly: number;
  changeYearly: number;
};

export type PerformanceReportData = {
  uptime: number; // percentage
  responseTime: number; // ms
  errorRate: number; // percentage
  apiCallsPerHour: number;
  changeUptime: number;
  changeResponseTime: number;
  changeErrorRate: number;
  changeApiCalls: number;
};

export type TrafficReportData = {
  visits: number;
  pageviews: number;
  bounceRate: number;
  avgTimeOnSite: number; // seconds
  changeVisits: number;
  changePageviews: number;
  changeBounce: number;
  changeAvgTime: number;
};

export type UsersReportData = {
  totalUsers: number;
  dau: number;
  mau: number;
  retentionRate: number;
  changeTotal: number;
  changeDau: number;
  changeMau: number;
  changeRetention: number;
};

// ======================
// UI / Notification / Dashboard supporting types
// ======================

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export type MessageItem = {
  id: string;
  from: string;
  message: string;
  time: string;
  read: boolean;
};

export type DashboardStat = {
  title: string;
  value: string;
  change: number;
  trend: number[];
  icon: 'users' | 'user-plus' | 'revenue' | 'orders' | 'traffic' | 'articles';
};

export type RecentActivity = {
  id: string;
  type: string;
  message: string;
  time: string;
};

// Chart data shapes (for future unification)
export type RevenueChartPoint = { month: string; revenue: number; orders: number };
export type UserGrowthPoint = { month: string; users: number; active: number };
export type TrafficSourcePoint = { name: string; value: number; color: string };
export type DevicePoint = { name: string; value: number; color: string };
export type ConversionPoint = { stage: string; value: number };
