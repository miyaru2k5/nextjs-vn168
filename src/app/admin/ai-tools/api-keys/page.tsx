'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { handleRowAction } from '@/lib/admin/status-maps';

const apiKeys = [
  { id: '1', name: 'Production Key', key: 'sk-****...abc123', status: 'active', createdAt: '2025-01-15', lastUsed: '2025-06-17' },
  { id: '2', name: 'Development Key', key: 'sk-****...def456', status: 'active', createdAt: '2025-02-20', lastUsed: '2025-06-16' },
  { id: '3', name: 'Test Key', key: 'sk-****...ghi789', status: 'revoked', createdAt: '2025-03-10', lastUsed: '2025-05-01' },
];

const keyStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  revoked: { label: 'Đã thu hồi', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
};

export default function APIKeysPage() {
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
