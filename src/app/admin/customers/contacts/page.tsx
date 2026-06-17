'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';

const contacts = [
  { id: '1', name: 'Trần Văn Minh', email: 'minh.tran@email.com', subject: 'Hỏi về gói Enterprise', status: 'new', date: '2025-06-17' },
  { id: '2', name: 'Nguyễn Thị Lan', email: 'lan.nguyen@email.com', subject: 'Yêu cầu demo', status: 'replied', date: '2025-06-16' },
  { id: '3', name: 'Lê Hoàng An', email: 'an.le@email.com', subject: 'Hợp tác kinh doanh', status: 'new', date: '2025-06-15' },
];

const contactStatusMap = {
  new: { label: 'Mới', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
  replied: { label: 'Đã phản hồi', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
};

export default function ContactsPage() {
  return (
    <div>
      <AdminPageHeader title="Liên hệ" description="Quản lý yêu cầu liên hệ từ khách hàng" />
      <DataTable
        data={contacts}
        searchKeys={['name', 'email', 'subject']}
        columns={[
          { key: 'name', label: 'Họ tên', sortable: true },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Chủ đề' },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={contactStatusMap} /> },
          { key: 'date', label: 'Ngày', sortable: true },
        ]}
      />
    </div>
  );
}
