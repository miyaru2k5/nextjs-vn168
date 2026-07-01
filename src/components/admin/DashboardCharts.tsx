'use client';

import dynamic from 'next/dynamic';
import ChartCard from './ChartCard';
import {
  useRevenueChartData,
  useUserGrowthData,
  useTrafficSourceData,
  useDeviceData,
  useConversionData,
} from '@/lib/admin/use-admin-data';

const RevenueChart = dynamic(() => import('./charts/RevenueChart'), { ssr: false, loading: () => <ChartPlaceholder /> });
const UserGrowthChart = dynamic(() => import('./charts/UserGrowthChart'), { ssr: false, loading: () => <ChartPlaceholder /> });
const TrafficSourceChart = dynamic(() => import('./charts/TrafficSourceChart'), { ssr: false, loading: () => <ChartPlaceholder /> });
const DeviceChart = dynamic(() => import('./charts/DeviceChart'), { ssr: false, loading: () => <ChartPlaceholder /> });
const ConversionChart = dynamic(() => import('./charts/ConversionChart'), { ssr: false, loading: () => <ChartPlaceholder /> });

function ChartPlaceholder() {
  return <div className="h-[280px] animate-pulse bg-gray-100 dark:bg-white/5 rounded-xl mx-3" />;
}

export function DashboardCharts() {
  const { data: revenueData } = useRevenueChartData();
  const { data: growthData } = useUserGrowthData();
  const { data: trafficData } = useTrafficSourceData();
  const { data: deviceData } = useDeviceData();
  const { data: conversionData } = useConversionData();

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <ChartCard title="Doanh thu theo thời gian" description="12 tháng gần nhất">
          <RevenueChart data={revenueData} />
        </ChartCard>
        <ChartCard title="Tăng trưởng người dùng" description="Tổng vs hoạt động">
          <UserGrowthChart data={growthData} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        <ChartCard title="Nguồn truy cập">
          <TrafficSourceChart data={trafficData} />
        </ChartCard>
        <ChartCard title="Thiết bị truy cập">
          <DeviceChart data={deviceData} />
        </ChartCard>
        <ChartCard title="Tỷ lệ chuyển đổi" className="md:col-span-2 xl:col-span-1">
          <ConversionChart data={conversionData} />
        </ChartCard>
      </div>
    </>
  );
}
