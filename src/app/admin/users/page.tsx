'use client';

import { useRouter } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { mockUsers } from '@/lib/admin/mock-data';
import { userStatusMap, handleRowAction } from '@/lib/admin/status-maps';
import type { UserRecord } from '@/lib/admin/mock-data';

export default function UsersPage() {
  const router = useRouter();

  return (
    <div>
      <AdminPageHeader
        title="Danh sách người dùng"
        description="Quản lý tài khoản người dùng trong hệ thống"
        action={{ label: 'Thêm người dùng', href: '/admin/users/new' }}
      />

      <DataTable<UserRecord>
        data={mockUsers}
        searchKeys={['name', 'email', 'role']}
        columns={[
          {
            key: 'name',
            label: 'Họ tên',
            sortable: true,
            render: (row) => (
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 text-xs font-bold shrink-0">
                  {row.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{row.name}</span>
              </div>
            ),
          },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'role', label: 'Vai trò', sortable: true },
          {
            key: 'status',
            label: 'Trạng thái',
            render: (row) => <StatusBadge status={row.status} map={userStatusMap} />,
          },
          { key: 'createdAt', label: 'Ngày tạo', sortable: true },
        ]}
        rowActions={[
          { label: 'Xem', icon: 'view', onClick: (row) => router.push(`/admin/users/${row.id}`) },
          { label: 'Sửa', icon: 'edit', onClick: (row) => router.push(`/admin/users/${row.id}/edit`) },
          { label: 'Khóa', icon: 'lock', onClick: (row) => handleRowAction('Khóa/Mở khóa', row.name) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa', row.name) },
        ]}
      />
    </div>
  );
}
