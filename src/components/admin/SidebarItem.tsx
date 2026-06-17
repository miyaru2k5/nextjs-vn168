'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AdminChevronIcon, AdminNavIcon } from '@/icons/admin-icons';
import type { NavItem } from '@/lib/admin/navigation';

type SidebarItemProps = {
  item: NavItem;
  collapsed: boolean;
  defaultOpen?: boolean;
};

export default function SidebarItem({ item, collapsed, defaultOpen = false }: SidebarItemProps) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = item.children?.some(
    (child) => child.href === pathname || (child.href && pathname.startsWith(child.href + '/'))
  );
  const isActive = item.href === pathname;

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-primary-500 text-white shadow-theme-xs'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        <AdminNavIcon name={item.icon} size={20} className="shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  }

  return (
    <SidebarGroup
      item={item}
      collapsed={collapsed}
      isChildActive={!!isChildActive}
      defaultOpen={defaultOpen || !!isChildActive}
      pathname={pathname}
    />
  );
}

function SidebarGroup({
  item,
  collapsed,
  isChildActive,
  defaultOpen,
  pathname,
}: {
  item: NavItem;
  collapsed: boolean;
  isChildActive: boolean;
  defaultOpen: boolean;
  pathname: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [isChildActive]);

  if (collapsed) {
    return (
      <div className="space-y-1">
        {item.children?.map((child) => {
          if (!child.href) return null;
          const active = child.href === pathname;
          return (
            <Link
              key={child.href}
              href={child.href}
              title={child.label}
              className={cn(
                'flex items-center justify-center p-2.5 rounded-xl transition-all duration-200',
                active
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
              )}
            >
              <AdminNavIcon name={child.icon} size={20} />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
          isChildActive
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        <AdminNavIcon name={item.icon} size={20} className="shrink-0" />
        <span className="flex-1 text-left truncate">{item.label}</span>
        <AdminChevronIcon
          className={cn('shrink-0 transition-transform duration-200', open && 'rotate-90')}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
        )}
      >
        <div className="ml-4 pl-3 border-l border-gray-200 dark:border-gray-700 space-y-0.5">
          {item.children?.map((child) => {
            if (!child.href) return null;
            const active = child.href === pathname;
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                  active
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                )}
              >
                <AdminNavIcon name={child.icon} size={16} className="shrink-0 opacity-70" />
                <span className="truncate">{child.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
