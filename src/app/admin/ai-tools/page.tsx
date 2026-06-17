'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { handleRowAction } from '@/lib/admin/status-maps';

const aiTools = [
  { id: '1', name: 'Text Generator', type: 'Chat', status: 'active', usage: 8420, tokens: '2.4M' },
  { id: '2', name: 'Image Generator', type: 'Image', status: 'active', usage: 3210, tokens: '1.1M' },
  { id: '3', name: 'Code Assistant', type: 'Code', status: 'active', usage: 5680, tokens: '3.2M' },
  { id: '4', name: 'Email Writer', type: 'Text', status: 'inactive', usage: 890, tokens: '0.3M' },
];

const toolStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  inactive: { label: 'Tắt', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
};

export default function AIToolsPage() {
  return (
    <div>
      <AdminPageHeader title="Công cụ AI" description="Quản lý các công cụ AI trong hệ thống" />
      <DataTable
        data={aiTools}
        searchKeys={['name', 'type']}
        columns={[
          { key: 'name', label: 'Tên công cụ', sortable: true },
          { key: 'type', label: 'Loại' },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={toolStatusMap} /> },
          { key: 'usage', label: 'Lượt dùng', sortable: true },
          { key: 'tokens', label: 'Token' },
        ]}
        rowActions={[
          { label: 'Cấu hình', icon: 'edit', onClick: (row) => handleRowAction('Cấu hình', row.name) },
        ]}
      />
    </div>
  );
}
