'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable from '@/components/admin/DataTable';
import { useRoles } from '@/lib/admin/use-admin-data';
import { handleRowAction } from '@/lib/admin/status-maps';
import type { RoleRecord } from '@/lib/admin/mock-data';

export default function RolesPage() {
  const { data: roles } = useRoles();

  return (
    <div>
      <AdminPageHeader
        title="Vai trò"
        description="Quản lý vai trò và quyền hạn người dùng"
        action={{ label: 'Thêm vai trò', href: '/admin/roles/new' }}
      />
      <DataTable<RoleRecord>
        data={roles}
        searchKeys={['name', 'description']}
        columns={[
          { key: 'name', label: 'Tên vai trò', sortable: true },
          { key: 'description', label: 'Mô tả' },
          { key: 'users', label: 'Số người dùng', sortable: true },
          { key: 'permissions', label: 'Quyền hạn', sortable: true },
          { key: 'createdAt', label: 'Ngày tạo', sortable: true },
        ]}
        rowActions={[
          { label: 'Sửa', icon: 'edit', onClick: (row) => handleRowAction('Sửa vai trò', row.name) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa vai trò', row.name) },
        ]}
      />
    </div>
  );
}
