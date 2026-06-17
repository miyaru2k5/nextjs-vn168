'use client';

import { cn } from '@/lib/utils';
import type { JobFilter } from '@/lib/careers/types';
import { JOB_FILTERS } from '@/lib/careers/types';

type Props = {
  active: JobFilter;
  onChange: (filter: JobFilter) => void;
  counts?: Record<string, number>;
};

export function CareersFilters({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {JOB_FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
            active === filter.value
              ? 'bg-primary-500 text-white shadow-theme-sm'
              : 'bg-white dark:bg-dark-primary text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:text-primary-500 dark:hover:border-primary-500'
          )}
        >
          {filter.label}
          {counts?.[filter.value] !== undefined && (
            <span
              className={cn(
                'ml-1.5 text-xs',
                active === filter.value ? 'text-white/80' : 'text-gray-400'
              )}
            >
              ({counts[filter.value]})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
