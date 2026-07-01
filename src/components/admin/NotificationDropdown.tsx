'use client';

import { useClickOutside } from '@/hooks/use-click-outside';
import { useNotifications } from '@/lib/admin/use-admin-data';
import { AdminBellIcon } from '@/icons/admin-icons';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const { data: notifications } = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative inline-flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition"
        aria-label="Thông báo"
      >
        <AdminBellIcon size={20} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 size-5 flex items-center justify-center rounded-full bg-error-500 text-white text-[10px] font-bold">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-primary rounded-2xl shadow-theme-lg border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Thông báo</h3>
            <span className="text-xs text-primary-600 dark:text-primary-400">{unread} chưa đọc</span>
          </div>
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {notifications.map((n) => (
              <button
                key={n.id}
                type="button"
                className={cn(
                  'w-full text-left px-4 py-3 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/5 transition',
                  !n.read && 'bg-primary-50/50 dark:bg-primary-500/5'
                )}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
