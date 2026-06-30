'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { useUsersReport } from '@/lib/admin/use-admin-data';

export default function UsersReportPage() {
  const report = useUsersReport();

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo người dùng" description="Phân tích tăng trưởng và hoạt động người dùng" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard 
          title="Tổng người dùng" 
          value={report.totalUsers.toLocaleString('vi-VN')} 
          change={report.changeTotal} 
          trend={[40, 55, 45, 60, 52, 68, 72]} 
          icon="users" 
        />
        <DashboardCard 
          title="DAU" 
          value={report.dau.toLocaleString('vi-VN')} 
          change={report.changeDau} 
          trend={[20, 25, 30, 28, 35, 38, 42]} 
          icon="user-plus" 
        />
        <DashboardCard 
          title="MAU" 
          value={report.mau.toLocaleString('vi-VN')} 
          change={report.changeMau} 
          trend={[50, 55, 58, 60, 62, 65, 68]} 
          icon="users" 
        />
        <DashboardCard 
          title="Tỷ lệ giữ chân" 
          value={`${report.retentionRate}%`} 
          change={report.changeRetention} 
          trend={[70, 72, 74, 75, 76, 77, 78]} 
          icon="traffic" 
        />
      </div>
      <DashboardCharts />
    </div>
  );
}
