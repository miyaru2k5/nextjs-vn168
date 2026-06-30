'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useInvoices } from '@/lib/admin/use-admin-data';
import { orderStatusMap } from '@/lib/admin/status-maps';

export default function PaymentsPage() {
  const { data: payments } = useInvoices(); // Reusing invoices as payment transactions for now

  return (
    <div>
      <AdminPageHeader title="Thanh toán" description="Theo dõi giao dịch thanh toán" />
      <DataTable
        data={payments}
        searchKeys={['id', 'customer']}
        columns={[
          { key: 'id', label: 'Mã giao dịch', sortable: true },
          { key: 'customer', label: 'Khách hàng' },
          { key: 'amount', label: 'Số tiền', render: (row) => `₫${row.amount.toLocaleString('vi-VN')}` },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={orderStatusMap} /> },
          { key: 'date', label: 'Ngày', sortable: true },
        ]}
      />
    </div>
  );
}
