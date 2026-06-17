'use client';

import { cn } from '@/lib/utils';
import { AdminTrendDownIcon, AdminTrendUpIcon } from '@/icons/admin-icons';
import {
  AdminUsersIcon,
  AdminCommerceIcon,
  AdminReportsIcon,
  AdminContentIcon,
} from '@/icons/admin-icons';

type DashboardCardProps = {
  title: string;
  value: string;
  change: number;
  trend: number[];
  icon: 'users' | 'user-plus' | 'revenue' | 'orders' | 'traffic' | 'articles';
};

const iconMap = {
  users: AdminUsersIcon,
  'user-plus': AdminUsersIcon,
  revenue: AdminReportsIcon,
  orders: AdminCommerceIcon,
  traffic: AdminReportsIcon,
  articles: AdminContentIcon,
};

function MiniChart({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#12b76a' : '#f04438'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardCard({ title, value, change, trend, icon }: DashboardCardProps) {
  const positive = change >= 0;
  const Icon = iconMap[icon];

  return (
    <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-theme-xs hover:shadow-theme-sm transition-shadow duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="size-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
          <Icon size={22} />
        </div>
        <MiniChart data={trend} positive={positive} />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full',
            positive
              ? 'bg-success-50 text-success-600 dark:bg-success-600/10 dark:text-success-600'
              : 'bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-500'
          )}
        >
          {positive ? <AdminTrendUpIcon /> : <AdminTrendDownIcon />}
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">so với tháng trước</span>
      </div>
    </div>
  );
}
