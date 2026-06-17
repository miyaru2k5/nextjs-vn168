'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { orderStatusMap } from '@/lib/admin/status-maps';

const payments = [
  { id: '1', orderId: 'ORD-2847', method: 'Stripe', amount: 499000, status: 'completed', date: '2025-06-17' },
  { id: '2', orderId: 'ORD-2846', method: 'MoMo', amount: 199000, status: 'completed', date: '2025-06-17' },
  { id: '3', orderId: 'ORD-2845', method: 'Bank Transfer', amount: 999000, status: 'pending', date: '2025-06-16' },
  { id: '4', orderId: 'ORD-2844', method: 'Stripe', amount: 499000, status: 'completed', date: '2025-06-16' },
];

export default function PaymentsPage() {
  return (
    <div>
      <AdminPageHeader title="Thanh toán" description="Theo dõi giao dịch thanh toán" />
      <DataTable
        data={payments}
        searchKeys={['orderId', 'method']}
        columns={[
          { key: 'orderId', label: 'Mã đơn', sortable: true },
          { key: 'method', label: 'Phương thức' },
          { key: 'amount', label: 'Số tiền', render: (row) => `₫${row.amount.toLocaleString('vi-VN')}` },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={orderStatusMap} /> },
          { key: 'date', label: 'Ngày', sortable: true },
        ]}
      />
    </div>
  );
}
