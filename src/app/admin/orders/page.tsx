'use client';

import { useRouter } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { mockOrders } from '@/lib/admin/mock-data';
import { orderStatusMap, handleRowAction } from '@/lib/admin/status-maps';
import type { OrderRecord } from '@/lib/admin/mock-data';

export default function OrdersPage() {
  const router = useRouter();

  return (
    <div>
      <AdminPageHeader title="Đơn hàng" description="Quản lý đơn hàng và giao dịch" />
      <DataTable<OrderRecord>
        data={mockOrders}
        searchKeys={['id', 'customer', 'email', 'package']}
        columns={[
          { key: 'id', label: 'Mã đơn', sortable: true },
          { key: 'customer', label: 'Khách hàng', sortable: true },
          { key: 'package', label: 'Gói dịch vụ' },
          { key: 'amount', label: 'Số tiền', sortable: true, render: (row) => `₫${row.amount.toLocaleString('vi-VN')}` },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={orderStatusMap} /> },
          { key: 'createdAt', label: 'Ngày tạo', sortable: true },
        ]}
        rowActions={[
          { label: 'Xem', icon: 'view', onClick: (row) => router.push(`/admin/orders/${row.id}`) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa đơn', row.id) },
        ]}
      />
    </div>
  );
}
