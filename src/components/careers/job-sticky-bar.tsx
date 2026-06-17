'use client';

import { cn } from '@/lib/utils';

type Props = {
  onApply: () => void;
  disabled?: boolean;
};

export function JobStickyBar({ onApply, disabled }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-dark-primary/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4 safe-area-pb">
      <button
        onClick={onApply}
        disabled={disabled}
        className={cn(
          'w-full h-12 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors duration-200 shadow-theme-md',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        {disabled ? 'Đã hết hạn ứng tuyển' : 'Ứng tuyển ngay'}
      </button>
    </div>
  );
}
