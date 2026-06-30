'use client';

import { useRouter } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useArticles } from '@/lib/admin/use-admin-data';
import { articleStatusMap, handleRowAction } from '@/lib/admin/status-maps';
import type { ArticleRecord } from '@/lib/admin/mock-data';

export default function ArticlesPage() {
  const router = useRouter();
  const { data: articles } = useArticles();

  return (
    <div>
      <AdminPageHeader title="Bài viết" description="Quản lý nội dung bài viết" action={{ label: 'Thêm bài viết', href: '/admin/articles/new' }} />
      <DataTable<ArticleRecord>
        data={articles}
        searchKeys={['title', 'category', 'author']}
        columns={[
          { key: 'title', label: 'Tiêu đề', sortable: true },
          { key: 'category', label: 'Danh mục', sortable: true },
          { key: 'author', label: 'Tác giả' },
          { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} map={articleStatusMap} /> },
          { key: 'views', label: 'Lượt xem', sortable: true },
          { key: 'createdAt', label: 'Ngày tạo', sortable: true },
        ]}
        rowActions={[
          { label: 'Xem', icon: 'view', onClick: (row) => router.push(`/admin/articles/${row.id}`) },
          { label: 'Sửa', icon: 'edit', onClick: (row) => router.push(`/admin/articles/${row.id}/edit`) },
          { label: 'Xóa', icon: 'delete', variant: 'danger', onClick: (row) => handleRowAction('Xóa bài viết', row.title) },
        ]}
      />
    </div>
  );
}
