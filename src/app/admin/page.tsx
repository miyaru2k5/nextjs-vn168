'use client';

import { useEffect } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import DashboardRecentArticles from '@/components/admin/DashboardRecentArticles';
import { DashboardRecentUsers, DashboardRecentOrders } from '@/components/admin/DashboardQuickLists';
import { useDashboardStats, useRecentActivities } from '@/lib/admin/use-admin-data';

const activityIcons: Record<string, string> = {
  user: '👤',
  order: '🛒',
  comment: '💬',
  admin: '⚙️',
};

export default function AdminDashboardPage() {
  const { data: stats } = useDashboardStats();
  const { data: activities } = useRecentActivities();

  useEffect(() => {
    document.title = 'Dashboard | Admin';
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      <AdminPageHeader
        title="Tổng quan"
        description="Chào mừng trở lại! Đây là tổng quan hệ thống của bạn."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      <DashboardCharts />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-theme-xs p-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <span className="text-lg shrink-0">{activityIcons[activity.type] ?? '📌'}</span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DashboardRecentUsers />
        <DashboardRecentOrders />
      </div>

      <DashboardRecentArticles />
    </div>
  );
}
