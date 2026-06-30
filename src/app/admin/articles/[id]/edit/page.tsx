'use client';

import { toast } from 'sonner';
import { notFound, useParams } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect, AdminTextarea } from '@/components/admin/AdminForm';
import { useArticles } from '@/lib/admin/use-admin-data';

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const articles = useArticles();
  const article = articles.find((a) => a.id === id);
  if (articles.length > 0 && !article) notFound();

  return (
    <div>
      <AdminPageHeader title={`Chỉnh sửa: ${article.title}`} />
      <AdminForm onSubmit={() => toast.success('Đã cập nhật bài viết')}>
        <AdminFormSection title="Nội dung">
          <div className="md:col-span-2">
            <InputGroup label="Tiêu đề" name="title" defaultValue={article.title} />
          </div>
          <AdminSelect label="Danh mục" name="category" defaultValue={article.category} options={[
            { value: 'Hướng dẫn', label: 'Hướng dẫn' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Tin tức', label: 'Tin tức' },
          ]} />
          <AdminSelect label="Trạng thái" name="status" defaultValue={article.status} options={[
            { value: 'draft', label: 'Nháp' },
            { value: 'published', label: 'Đã đăng' },
            { value: 'scheduled', label: 'Lên lịch' },
          ]} />
          <AdminTextarea label="Nội dung" name="content" rows={8} defaultValue="Nội dung bài viết..." />
        </AdminFormSection>
        <AdminFormActions cancelHref={`/admin/articles/${article.id}`} />
      </AdminForm>
    </div>
  );
}
