'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useApiKeys } from '@/lib/admin/use-admin-data';
import { handleRowAction } from '@/lib/admin/status-maps';

const keyStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  revoked: { label: 'Đã thu hồi', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
};

export default function APIKeysPage() {
  const { data: apiKeys } = useApiKeys();

  return (
    <div>
      <AdminPageHeader title="API Key" description="Quản lý API keys">
        <button
          type="button"
          onClick={() => toast.success('Đã tạo API key mới')}
          className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition"
        >
          Tạo API Key
        </button>
      </AdminPageHeader>
      <DataTable
        data={apiKeys}
        searchKeys={['name', 'key']}
        columns={[
          { key: 'name', label: 'Tên', sortable: true },
          { key: 'key', label: 'Key', render: (row) => <code className="text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">{row.key}</code> },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={keyStatusMap} /> },
          { key: 'createdAt', label: 'Ngày tạo' },
          { key: 'lastUsed', label: 'Dùng lần cuối' },
        ]}
        rowActions={[
          { label: 'Thu hồi', icon: 'lock', onClick: (row) => handleRowAction('Thu hồi key', row.name) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa key', row.name) },
        ]}
      />
    </div>
  );
}
