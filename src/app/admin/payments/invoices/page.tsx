'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useInvoices } from '@/lib/admin/use-admin-data';

const invoiceStatusMap = {
  paid: { label: 'Đã thanh toán', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  pending: { label: 'Chờ thanh toán', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
  overdue: { label: 'Quá hạn', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
};

export default function InvoicesPage() {
  const { data: invoices } = useInvoices();

  return (
    <div>
      <AdminPageHeader title="Hóa đơn" description="Quản lý hóa đơn thanh toán" />
      <DataTable
        data={invoices}
        searchKeys={['id', 'customer']}
        columns={[
          { key: 'id', label: 'Mã HĐ', sortable: true },
          { key: 'customer', label: 'Khách hàng', sortable: true },
          { key: 'amount', label: 'Số tiền', render: (row) => `₫${row.amount.toLocaleString('vi-VN')}` },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={invoiceStatusMap} /> },
          { key: 'date', label: 'Ngày', sortable: true },
        ]}
      />
    </div>
  );
}
