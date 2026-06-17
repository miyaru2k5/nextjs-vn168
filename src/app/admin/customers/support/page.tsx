'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { handleRowAction } from '@/lib/admin/status-maps';

const tickets = [
  { id: 'TK-001', customer: 'Trần Văn Minh', subject: 'Không thể reset API key', priority: 'high', status: 'open', date: '2025-06-17' },
  { id: 'TK-002', customer: 'Nguyễn Thị Lan', subject: 'Lỗi thanh toán MoMo', priority: 'medium', status: 'in_progress', date: '2025-06-16' },
  { id: 'TK-003', customer: 'Lê Hoàng An', subject: 'Hỏi về tính năng mới', priority: 'low', status: 'resolved', date: '2025-06-15' },
];

const ticketStatusMap = {
  open: { label: 'Mở', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
  in_progress: { label: 'Đang xử lý', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
  resolved: { label: 'Đã giải quyết', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
};

const priorityMap = {
  high: { label: 'Cao', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
  medium: { label: 'Trung bình', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
  low: { label: 'Thấp', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
};

export default function SupportPage() {
  return (
    <div>
      <AdminPageHeader title="Hỗ trợ khách hàng" description="Quản lý ticket hỗ trợ" />
      <DataTable
        data={tickets}
        searchKeys={['id', 'customer', 'subject']}
        columns={[
          { key: 'id', label: 'Mã ticket', sortable: true },
          { key: 'customer', label: 'Khách hàng', sortable: true },
          { key: 'subject', label: 'Chủ đề' },
          { key: 'priority', label: 'Ưu tiên', render: (row) => <StatusBadge status={row.priority} map={priorityMap} /> },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={ticketStatusMap} /> },
          { key: 'date', label: 'Ngày', sortable: true },
        ]}
        rowActions={[
          { label: 'Xem', icon: 'view', onClick: (row) => handleRowAction('Xem ticket', row.id) },
          { label: 'Sửa', icon: 'edit', onClick: (row) => handleRowAction('Cập nhật ticket', row.id) },
        ]}
      />
    </div>
  );
}
