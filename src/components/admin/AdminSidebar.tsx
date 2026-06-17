'use client';

import Link from 'next/link';
import Image from 'next/image';
import { adminNavItems, currentAdmin } from '@/lib/admin/navigation';
import { AdminLogoutIcon } from '@/icons/admin-icons';
import SidebarItem from './SidebarItem';
import { cn } from '@/lib/utils';
type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function AdminSidebar({ collapsed, mobileOpen, onCloseMobile }: AdminSidebarProps) {
  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-dark-primary border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-[260px]',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex items-center justify-between px-4 h-16 border-b border-gray-100 dark:border-gray-800 shrink-0',
            collapsed && 'justify-center px-2'
          )}
        >
          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <Image
              src="/images/logo-black.svg"
              alt="AI Starter Kit"
              width={36}
              height={36}
              className="shrink-0 dark:hidden"
            />
            <Image
              src="/images/logo-white.svg"
              alt="AI Starter Kit"
              width={36}
              height={36}
              className="shrink-0 hidden dark:block"
            />

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  AI Starter Kit
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Admin Panel
                </p>
              </div>
            )}
          </Link>

          {/* Close button Mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden flex items-center justify-center size-9 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition"
            aria-label="Đóng sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-1">
          {adminNavItems.map((item) => (
            <SidebarItem key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Admin info + logout */}
        <div className={cn('border-t border-gray-100 dark:border-gray-800 p-3 shrink-0', collapsed && 'px-2')}>
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-white/5 mb-2">
              <div className="size-9 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold shrink-0">
                NA
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{currentAdmin.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentAdmin.role}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-2">
              <div className="size-9 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold">
                NA
              </div>
            </div>
          )}

          <Link
            href="/signin"
            title="Đăng xuất"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-error-600 dark:text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 transition',
              collapsed && 'justify-center px-2'
            )}
          >
            <AdminLogoutIcon size={20} />
            {!collapsed && <span>Đăng xuất</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
    </>
  );
}
