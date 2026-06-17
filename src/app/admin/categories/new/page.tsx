'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect } from '@/components/admin/AdminForm';

export default function NewCategoryPage() {
  return (
    <div>
      <AdminPageHeader title="Thêm danh mục mới" />
      <AdminForm onSubmit={() => toast.success('Đã tạo danh mục')}>
        <AdminFormSection title="Thông tin danh mục">
          <InputGroup label="Tên danh mục" name="name" />
          <InputGroup label="Slug" name="slug" placeholder="ten-danh-muc" />
          <AdminSelect label="Danh mục cha" name="parent" options={[
            { value: '', label: 'Không có (cấp 1)' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'huong-dan', label: 'Hướng dẫn' },
          ]} />
          <AdminSelect label="Trạng thái" name="status" options={[
            { value: 'active', label: 'Hoạt động' },
            { value: 'inactive', label: 'Tắt' },
          ]} />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin/categories" submitLabel="Tạo danh mục" />
      </AdminForm>
    </div>
  );
}
