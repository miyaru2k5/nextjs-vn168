'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useMessages } from '@/lib/admin/use-admin-data';
import { AdminMessageIcon } from '@/icons/admin-icons';
import { cn } from '@/lib/utils';

export function MessageDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const { data: messages } = useMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative inline-flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition"
        aria-label="Tin nhắn"
      >
        <AdminMessageIcon size={20} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 size-5 flex items-center justify-center rounded-full bg-primary-500 text-white text-[10px] font-bold">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-primary rounded-2xl shadow-theme-lg border border-gray-100 dark:border-gray-800 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tin nhắn</h3>
          </div>
          <div className="max-h-72 overflow-y-auto custom-scrollbar">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'px-4 py-3 border-b border-gray-50 dark:border-gray-800/50',
                  !m.read && 'bg-primary-50/50 dark:bg-primary-500/5'
                )}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">{m.from}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{m.message}</p>
                <p className="text-xs text-gray-400 mt-1">{m.time}</p>
              </div>
            ))}
          </div>
          <Link
            href="/admin/customers/support"
            onClick={() => setOpen(false)}
            className="block text-center py-3 text-sm text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-white/5 border-t border-gray-100 dark:border-gray-800"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
}

export function QuickCreateDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const items = [
    { label: 'Bài viết mới', href: '/admin/articles/new' },
    { label: 'Người dùng mới', href: '/admin/users/new' },
    { label: 'Banner mới', href: '/admin/banners/new' },
  ];

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition shadow-theme-xs"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Tạo mới
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-primary rounded-2xl shadow-theme-lg border border-gray-100 dark:border-gray-800 py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
