'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { useRevenueReport } from '@/lib/admin/use-admin-data';

export default function RevenueReportPage() {
  const { data: report } = useRevenueReport();

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo doanh thu" description="Phân tích doanh thu theo thời gian" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard 
          title="Doanh thu tháng" 
          value={`₫${(report.monthlyRevenue / 1000000).toFixed(1)}M`} 
          change={report.changeMonthly} 
          trend={[30, 45, 40, 55, 50, 65, 70]} 
          icon="revenue" 
        />
        <DashboardCard 
          title="Doanh thu năm" 
          value={`₫${(report.yearlyRevenue / 1000000).toFixed(1)}M`} 
          change={report.changeYearly} 
          trend={[60, 65, 70, 75, 80, 85, 90]} 
          icon="revenue" 
        />
        <DashboardCard 
          title="ARPU" 
          value={`₫${Math.round(report.arpu / 1000)}K`} 
          change={5.7} 
          trend={[10, 12, 15, 14, 18, 20, 22]} 
          icon="orders" 
        />
        <DashboardCard 
          title="Tỷ lệ hoàn tiền" 
          value={`${report.refundRate}%`} 
          change={-0.3} 
          trend={[50, 48, 52, 45, 50, 47, 49]} 
          icon="traffic" 
        />
      </div>
      <DashboardCharts />
    </div>
  );
}
