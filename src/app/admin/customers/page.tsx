'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { mockCustomers } from '@/lib/admin/mock-data';
import { handleRowAction } from '@/lib/admin/status-maps';
import type { CustomerRecord } from '@/lib/admin/mock-data';

const customerStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  inactive: { label: 'Không hoạt động', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
};

export default function CustomersPage() {
  return (
    <div>
      <AdminPageHeader title="Danh sách khách hàng" description="Quản lý thông tin khách hàng" />
      <DataTable<CustomerRecord>
        data={mockCustomers}
        searchKeys={['name', 'email', 'phone']}
        columns={[
          { key: 'name', label: 'Họ tên', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'phone', label: 'SĐT' },
          { key: 'package', label: 'Gói' },
          { key: 'totalSpent', label: 'Tổng chi', render: (row) => `₫${row.totalSpent.toLocaleString('vi-VN')}` },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={customerStatusMap} /> },
        ]}
        rowActions={[
          { label: 'Xem', icon: 'view', onClick: (row) => handleRowAction('Xem KH', row.name) },
          { label: 'Sửa', icon: 'edit', onClick: (row) => handleRowAction('Sửa KH', row.name) },
        ]}
      />
    </div>
  );
}
