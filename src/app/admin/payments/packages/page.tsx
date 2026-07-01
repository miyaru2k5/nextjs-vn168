'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable from '@/components/admin/DataTable';
import { handleRowAction } from '@/lib/admin/status-maps';

// Simple static for packages (can be seeded later if needed)
const packages = [
  { id: '1', name: 'Starter', price: 199000, period: 'tháng', users: 8420, features: 5 },
  { id: '2', name: 'Pro', price: 499000, period: 'tháng', users: 3240, features: 12 },
  { id: '3', name: 'Enterprise', price: 999000, period: 'tháng', users: 187, features: 24 },
];

export default function PackagesPage() {
  return (
    <div>
      <AdminPageHeader title="Gói dịch vụ" description="Quản lý các gói subscription" action={{ label: 'Thêm gói', href: '#' }} />
      <DataTable
        data={packages}
        searchKeys={['name']}
        columns={[
          { key: 'name', label: 'Tên gói', sortable: true },
          { key: 'price', label: 'Giá', render: (row) => `₫${row.price.toLocaleString('vi-VN')}/${row.period}` },
          { key: 'users', label: 'Người dùng', sortable: true },
          { key: 'features', label: 'Tính năng' },
        ]}
        rowActions={[
          { label: 'Sửa', icon: 'edit', onClick: (row) => handleRowAction('Sửa gói', row.name) },
        ]}
      />
    </div>
  );
}
