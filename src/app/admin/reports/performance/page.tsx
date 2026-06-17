'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DashboardCard from '@/components/admin/DashboardCard';

export default function PerformanceReportPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Báo cáo hiệu suất" description="Theo dõi hiệu suất hệ thống" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardCard title="Uptime" value="99.98%" change={0.02} trend={[99, 99.5, 99.8, 99.9, 99.95, 99.98, 99.98]} icon="traffic" />
        <DashboardCard title="Response time" value="124ms" change={-8.5} trend={[150, 140, 135, 130, 128, 125, 124]} icon="orders" />
        <DashboardCard title="Error rate" value="0.12%" change={-0.05} trend={[0.2, 0.18, 0.15, 0.14, 0.13, 0.12, 0.12]} icon="revenue" />
        <DashboardCard title="API calls/giờ" value="12.4K" change={15.3} trend={[8, 9, 10, 10.5, 11, 12, 12.4]} icon="users" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Server CPU', value: 42, max: 100 },
          { label: 'Memory Usage', value: 68, max: 100 },
          { label: 'Disk Usage', value: 35, max: 100 },
          { label: 'Network I/O', value: 24, max: 100 },
        ].map((metric) => (
          <div key={metric.label} className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-theme-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{metric.value}%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
