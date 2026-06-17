'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getBreadcrumbs } from '@/lib/admin/navigation';
import { AdminMenuIcon } from '@/icons/admin-icons';
import ThemeToggle from '@/components/layout/header/theme-toggle';
import Breadcrumb from './Breadcrumb';
import SearchCommand from './SearchCommand';
import NotificationDropdown from './NotificationDropdown';
import { MessageDropdown, QuickCreateDropdown } from './QuickActions';
import UserMenu from './UserMenu';
import { cn } from '@/lib/utils';

type AdminHeaderProps = {
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
};

export default function AdminHeader({ onToggleSidebar, onToggleMobile }: AdminHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-16 flex items-center gap-3 px-4 lg:px-6 bg-white/80 dark:bg-dark-primary/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-shadow duration-300',
        scrolled && 'shadow-theme-sm'
      )}
    >
      <button
        type="button"
        onClick={() => {
          if (window.innerWidth < 1024) {
            onToggleMobile();
          } else {
            onToggleSidebar();
          }
        }}
        className="inline-flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition shrink-0"
        aria-label="Toggle sidebar"
      >
        <AdminMenuIcon size={20} />
      </button>

      <Breadcrumb items={breadcrumbs} />

      <div className="flex-1 flex items-center justify-center max-w-xl mx-auto">
        <SearchCommand />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <NotificationDropdown />
        <MessageDropdown />
        <QuickCreateDropdown />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
