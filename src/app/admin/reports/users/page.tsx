'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';

export default function UsersReportPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo người dùng" description="Phân tích tăng trưởng và hoạt động người dùng" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Tổng người dùng" value="12,847" change={12.5} trend={[40, 55, 45, 60, 52, 68, 72]} icon="users" />
        <DashboardCard title="DAU" value="3,240" change={8.2} trend={[20, 25, 30, 28, 35, 38, 42]} icon="user-plus" />
        <DashboardCard title="MAU" value="9,600" change={10.5} trend={[50, 55, 58, 60, 62, 65, 68]} icon="users" />
        <DashboardCard title="Tỷ lệ giữ chân" value="78.5%" change={2.1} trend={[70, 72, 74, 75, 76, 77, 78]} icon="traffic" />
      </div>
      <DashboardCharts />
    </div>
  );
}
