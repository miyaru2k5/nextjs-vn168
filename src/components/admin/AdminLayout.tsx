'use client';

import { useSidebar } from '@/lib/admin/hooks/use-sidebar';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { collapsed, mobileOpen, mounted, toggleCollapse, toggleMobile, closeMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-secondary">
      <AdminSidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={closeMobile} />

      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300',
          mounted && (collapsed ? 'lg:ml-20' : 'lg:ml-[260px]')
        )}
      >
        <AdminHeader
          onToggleSidebar={toggleCollapse}
          onToggleMobile={toggleMobile}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
