'use client';

import Link from 'next/link';
import DataTable, { StatusBadge } from '@/components/admin/DataTable';
import { useArticles } from '@/lib/admin/use-admin-data';
import { articleStatusMap } from '@/lib/admin/status-maps';

export default function DashboardRecentArticles() {
  const { data: articles } = useArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Bài viết mới nhất</h3>
        <Link href="/admin/articles" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          Xem tất cả
        </Link>
      </div>
      <DataTable
        data={articles.slice(0, 5)}
        columns={[
          { key: 'title', label: 'Tiêu đề', sortable: true },
          { key: 'category', label: 'Danh mục' },
          { key: 'author', label: 'Tác giả' },
          {
            key: 'status',
            label: 'Trạng thái',
            render: (row) => <StatusBadge status={row.status} map={articleStatusMap} />,
          },
          { key: 'views', label: 'Lượt xem', sortable: true },
        ]}
        searchKeys={['title', 'category', 'author']}
        selectable={false}
        exportable={false}
        filterable={false}
        pageSize={5}
      />
    </div>
  );
}
