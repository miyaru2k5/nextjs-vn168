'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useAiTools } from '@/lib/admin/use-admin-data';
import { handleRowAction } from '@/lib/admin/status-maps';

const toolStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  inactive: { label: 'Tắt', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
};

export default function AIToolsPage() {
  const aiTools = useAiTools();

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
