'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useCategories } from '@/lib/admin/use-admin-data';
import { handleRowAction } from '@/lib/admin/status-maps';
import type { CategoryRecord } from '@/lib/admin/mock-data';

const categoryStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  inactive: { label: 'Tắt', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
};

export default function CategoriesPage() {
  const categories = useCategories();

  return (
    <div>
      <AdminPageHeader title="Danh mục" description="Quản lý cây danh mục nhiều cấp" action={{ label: 'Thêm danh mục', href: '/admin/categories/new' }} />
      <DataTable<CategoryRecord>
        data={categories}
        searchKeys={['name', 'slug']}
        columns={[
          {
            key: 'name',
            label: 'Tên danh mục',
            sortable: true,
            render: (row) => (
              <span className={row.parent ? 'pl-6 text-gray-600 dark:text-gray-400' : 'font-medium text-gray-900 dark:text-white'}>
                {row.parent ? '└ ' : ''}{row.name}
              </span>
            ),
          },
          { key: 'slug', label: 'Slug' },
          { key: 'parent', label: 'Danh mục cha', render: (row) => row.parent ?? '—' },
          { key: 'articles', label: 'Bài viết', sortable: true },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={categoryStatusMap} /> },
        ]}
        rowActions={[
          { label: 'Sửa', icon: 'edit', onClick: (row) => handleRowAction('Sửa danh mục', row.name) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa danh mục', row.name) },
        ]}
      />
    </div>
  );
}
