'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';

export default function RevenueReportPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo doanh thu" description="Phân tích doanh thu theo thời gian" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Doanh thu tháng" value="₫48.2M" change={15.3} trend={[30, 45, 40, 55, 50, 65, 70]} icon="revenue" />
        <DashboardCard title="Doanh thu năm" value="₫248.5M" change={22.1} trend={[60, 65, 70, 75, 80, 85, 90]} icon="revenue" />
        <DashboardCard title="ARPU" value="₫193K" change={5.7} trend={[10, 12, 15, 14, 18, 20, 22]} icon="orders" />
        <DashboardCard title="Tỷ lệ hoàn tiền" value="1.2%" change={-0.3} trend={[50, 48, 52, 45, 50, 47, 49]} icon="traffic" />
      </div>
      <DashboardCharts />
    </div>
  );
}
