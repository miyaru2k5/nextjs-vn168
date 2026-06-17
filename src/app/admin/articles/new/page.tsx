'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect, AdminTextarea } from '@/components/admin/AdminForm';

export default function NewArticlePage() {
  return (
    <div>
      <AdminPageHeader title="Thêm bài viết mới" />
      <AdminForm onSubmit={() => toast.success('Đã lưu bài viết')}>
        <AdminFormSection title="Nội dung bài viết">
          <div className="md:col-span-2">
            <InputGroup label="Tiêu đề" name="title" />
          </div>
          <AdminSelect label="Danh mục" name="category" options={[
            { value: 'huong-dan', label: 'Hướng dẫn' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'tin-tuc', label: 'Tin tức' },
          ]} />
          <AdminSelect label="Trạng thái" name="status" options={[
            { value: 'draft', label: 'Nháp' },
            { value: 'published', label: 'Đăng ngay' },
            { value: 'scheduled', label: 'Lên lịch' },
          ]} />
          <AdminTextarea label="Nội dung" name="content" rows={8} />
        </AdminFormSection>
        <AdminFormSection title="SEO Metadata">
          <InputGroup label="Meta Title" name="metaTitle" />
          <InputGroup label="Meta Description" name="metaDescription" />
          <div className="md:col-span-2">
            <InputGroup label="Slug URL" name="slug" placeholder="huong-dan-ai-text-generator" />
          </div>
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin/articles" submitLabel="Lưu bài viết" />
      </AdminForm>
    </div>
  );
}
