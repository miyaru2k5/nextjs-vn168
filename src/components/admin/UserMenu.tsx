'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/use-click-outside';
import { currentAdmin } from '@/lib/admin/navigation';
import { AdminChevronIcon, AdminLogoutIcon } from '@/icons/admin-icons';
import { cn } from '@/lib/utils';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="size-9 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold">
          NA
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{currentAdmin.name.split(' ').slice(-2).join(' ')}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{currentAdmin.role}</p>
        </div>
        <AdminChevronIcon className={cn('hidden lg:block transition-transform', open && 'rotate-90')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark-primary rounded-2xl shadow-theme-lg border border-gray-100 dark:border-gray-800 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{currentAdmin.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{currentAdmin.email}</p>
          </div>
          <div className="py-1">
            <Link href="/admin/profile" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
              Hồ sơ
            </Link>
            <Link href="/admin/settings/website" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
              Cài đặt
            </Link>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 pt-1">
            <Link href="/signin" className="flex items-center gap-2 px-4 py-2 text-sm text-error-600 dark:text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10">
              <AdminLogoutIcon size={16} />
              Đăng xuất
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
