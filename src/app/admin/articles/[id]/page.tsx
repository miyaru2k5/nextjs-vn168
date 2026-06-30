import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { StatusBadge } from '@/components/admin/DataTable';
import { getArticles } from '@/lib/admin/seed-loader';
import { articleStatusMap } from '@/lib/admin/status-maps';

type Props = { params: Promise<{ id: string }> };

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <div>
      <AdminPageHeader title={article.title}>
        <Link href={`/admin/articles/${id}/edit`} className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition">
          Chỉnh sửa
        </Link>
      </AdminPageHeader>
      <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-theme-xs">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
          <div><dt className="text-gray-500">Danh mục</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{article.category}</dd></div>
          <div><dt className="text-gray-500">Tác giả</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{article.author}</dd></div>
          <div><dt className="text-gray-500">Trạng thái</dt><dd className="mt-1"><StatusBadge status={article.status} map={articleStatusMap} /></dd></div>
          <div><dt className="text-gray-500">Lượt xem</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{article.views.toLocaleString('vi-VN')}</dd></div>
        </dl>
        <div className="prose dark:prose-invert max-w-none">
          <p>Nội dung bài viết sẽ hiển thị tại đây. Đây là trang xem trước chi tiết bài viết trong hệ thống quản trị.</p>
        </div>
      </div>
    </div>
  );
}
