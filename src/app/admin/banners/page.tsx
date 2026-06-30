'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useBanners } from '@/lib/admin/use-admin-data';
import { bannerStatusMap, handleRowAction } from '@/lib/admin/status-maps';
import type { BannerRecord } from '@/lib/admin/mock-data';

export default function BannersPage() {
  const banners = useBanners();

  return (
    <div>
      <AdminPageHeader title="Banner" description="Quản lý banner quảng cáo" action={{ label: 'Thêm banner', href: '/admin/banners/new' }} />
      <DataTable<BannerRecord>
        data={banners}
        searchKeys={['title', 'position']}
        columns={[
          { key: 'title', label: 'Tiêu đề', sortable: true },
          { key: 'position', label: 'Vị trí' },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={bannerStatusMap} /> },
          { key: 'startDate', label: 'Bắt đầu', sortable: true },
          { key: 'endDate', label: 'Kết thúc', sortable: true },
        ]}
        rowActions={[
          { label: 'Sửa', icon: 'edit', onClick: (row) => handleRowAction('Sửa banner', row.title) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa banner', row.title) },
        ]}
      />
    </div>
  );
}
