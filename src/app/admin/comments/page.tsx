'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useComments } from '@/lib/admin/use-admin-data';
import { commentStatusMap, handleRowAction } from '@/lib/admin/status-maps';
import type { CommentRecord } from '@/lib/admin/mock-data';

export default function CommentsPage() {
  const { data: comments } = useComments();

  return (
    <div>
      <AdminPageHeader title="Bình luận" description="Duyệt, ẩn và quản lý bình luận" />
      <DataTable<CommentRecord>
        data={comments}
        searchKeys={['author', 'content', 'article']}
        columns={[
          { key: 'author', label: 'Người gửi', sortable: true },
          { key: 'content', label: 'Nội dung', render: (row) => <span className="line-clamp-2 max-w-xs">{row.content}</span> },
          { key: 'article', label: 'Bài viết' },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={commentStatusMap} /> },
          { key: 'createdAt', label: 'Ngày', sortable: true },
        ]}
        rowActions={[
          { label: 'Duyệt', icon: 'view', onClick: (row) => handleRowAction('Duyệt', row.author) },
          { label: 'Ẩn', icon: 'lock', onClick: (row) => handleRowAction('Ẩn', row.author) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa', row.author) },
        ]}
      />
    </div>
  );
}
