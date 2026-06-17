'use client';

import { cn } from '@/lib/utils';

type ChartCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
};

export default function ChartCard({ title, description, children, className, action }: ChartCardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-theme-xs',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-2">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="px-2 pb-4">{children}</div>
    </div>
  );
}
