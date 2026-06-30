'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable from '@/components/admin/DataTable';
import { useAiHistory } from '@/lib/admin/use-admin-data';

export default function AIHistoryPage() {
  const { data: history } = useAiHistory();

  return (
    <div>
      <AdminPageHeader title="Lịch sử sử dụng AI" description="Theo dõi lịch sử sử dụng công cụ AI" />
      <DataTable data={history} searchKeys={['user', 'tool']} columns={[
        { key: 'user', label: 'Người dùng', sortable: true },
        { key: 'tool', label: 'Công cụ', sortable: true },
        { key: 'tokens', label: 'Token', sortable: true },
        { key: 'duration', label: 'Thời gian' },
        { key: 'createdAt', label: 'Thời điểm', sortable: true },
      ]} selectable={false} />
    </div>
  );
}
