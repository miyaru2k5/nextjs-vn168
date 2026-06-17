'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';

export default function TokenStatsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Thống kê Token" description="Theo dõi sử dụng token AI" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Token hôm nay" value="124.5K" change={8.3} trend={[30, 40, 35, 50, 45, 55, 60]} icon="traffic" />
        <DashboardCard title="Token tháng này" value="3.2M" change={15.7} trend={[40, 50, 55, 60, 65, 70, 75]} icon="revenue" />
        <DashboardCard title="Chi phí ước tính" value="₫4.8M" change={12.1} trend={[20, 25, 30, 28, 35, 38, 42]} icon="orders" />
        <DashboardCard title="Request/giờ" value="842" change={-3.2} trend={[50, 48, 52, 45, 50, 47, 49]} icon="users" />
      </div>
      <DashboardCharts />
    </div>
  );
}
