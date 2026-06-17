'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminTextarea } from '@/components/admin/AdminForm';

export default function NewRolePage() {
  return (
    <div>
      <AdminPageHeader title="Thêm vai trò mới" />
      <AdminForm onSubmit={() => toast.success('Đã tạo vai trò mới')}>
        <AdminFormSection title="Thông tin vai trò">
          <InputGroup label="Tên vai trò" name="name" placeholder="VD: Editor" />
          <AdminTextarea label="Mô tả" name="description" rows={3} />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin/roles" submitLabel="Tạo vai trò" />
      </AdminForm>
    </div>
  );
}
