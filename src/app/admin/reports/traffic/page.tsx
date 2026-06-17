'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';

export default function TrafficReportPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo lượt truy cập" description="Phân tích traffic và nguồn truy cập" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Lượt truy cập" value="89,432" change={22.1} trend={[60, 65, 70, 75, 80, 85, 90]} icon="traffic" />
        <DashboardCard title="Pageviews" value="245,680" change={18.4} trend={[55, 60, 65, 70, 75, 80, 85]} icon="articles" />
        <DashboardCard title="Bounce rate" value="32.5%" change={-4.2} trend={[40, 38, 36, 35, 34, 33, 32]} icon="orders" />
        <DashboardCard title="Thời gian TB" value="3m 42s" change={6.8} trend={[30, 32, 34, 35, 36, 37, 38]} icon="users" />
      </div>
      <DashboardCharts />
    </div>
  );
}
