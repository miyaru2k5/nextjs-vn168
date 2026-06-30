'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { useTrafficReport } from '@/lib/admin/use-admin-data';

export default function TrafficReportPage() {
  const { data: report } = useTrafficReport();
  const avgTime = `${Math.floor(report.avgTimeOnSite / 60)}m ${report.avgTimeOnSite % 60}s`;

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo lượt truy cập" description="Phân tích traffic và nguồn truy cập" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard 
          title="Lượt truy cập" 
          value={report.visits.toLocaleString('vi-VN')} 
          change={report.changeVisits} 
          trend={[60, 65, 70, 75, 80, 85, 90]} 
          icon="traffic" 
        />
        <DashboardCard 
          title="Pageviews" 
          value={report.pageviews.toLocaleString('vi-VN')} 
          change={report.changePageviews} 
          trend={[55, 60, 65, 70, 75, 80, 85]} 
          icon="articles" 
        />
        <DashboardCard 
          title="Bounce rate" 
          value={`${report.bounceRate}%`} 
          change={report.changeBounce} 
          trend={[40, 38, 36, 35, 34, 33, 32]} 
          icon="orders" 
        />
        <DashboardCard 
          title="Thời gian TB" 
          value={avgTime} 
          change={report.changeAvgTime} 
          trend={[30, 32, 34, 35, 36, 37, 38]} 
          icon="users" 
        />
      </div>
      <DashboardCharts />
    </div>
  );
}
