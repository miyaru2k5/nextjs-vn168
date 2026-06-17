'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable from '@/components/admin/DataTable';

const history = [
  { id: '1', user: 'Trần Văn Minh', tool: 'Text Generator', tokens: 1250, duration: '2.3s', createdAt: '2025-06-17 10:30' },
  { id: '2', user: 'Nguyễn Thị Lan', tool: 'Code Assistant', tokens: 3420, duration: '5.1s', createdAt: '2025-06-17 10:15' },
  { id: '3', user: 'Lê Hoàng An', tool: 'Text Generator', tokens: 890, duration: '1.8s', createdAt: '2025-06-17 09:45' },
  { id: '4', user: 'Phạm Thu Hà', tool: 'Image Generator', tokens: 2100, duration: '8.2s', createdAt: '2025-06-17 09:20' },
  { id: '5', user: 'Hoàng Đức Bình', tool: 'Text Generator', tokens: 560, duration: '1.2s', createdAt: '2025-06-17 08:50' },
];

export default function AIHistoryPage() {
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
