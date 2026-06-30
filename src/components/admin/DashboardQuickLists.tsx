'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/admin/DataTable';
import { useUsers, useOrders } from '@/lib/admin/use-admin-data';
import { userStatusMap, orderStatusMap } from '@/lib/admin/status-maps';

export function DashboardRecentUsers() {
  const users = useUsers();

  return (
    <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-theme-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Người dùng mới</h3>
        <Link href="/admin/users" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="space-y-3">
        {users.slice(0, 5).map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
            <StatusBadge status={user.status} map={userStatusMap} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardRecentOrders() {
  const orders = useOrders();

  return (
    <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-theme-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Đơn hàng mới</h3>
        <Link href="/admin/orders" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="space-y-3">
        {orders.slice(0, 5).map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{order.customer}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                ₫{order.amount.toLocaleString('vi-VN')}
              </p>
              <StatusBadge status={order.status} map={orderStatusMap} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
