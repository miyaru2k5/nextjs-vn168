'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup } from '@/components/admin/AdminForm';

export default function ChangePasswordPage() {
  return (
    <div>
      <AdminPageHeader title="Đổi mật khẩu" description="Cập nhật mật khẩu tài khoản admin" />
      <AdminForm onSubmit={() => toast.success('Đã đổi mật khẩu thành công')}>
        <AdminFormSection title="Mật khẩu">
          <div className="md:col-span-2">
            <InputGroup label="Mật khẩu hiện tại" name="currentPassword" type="password" />
          </div>
          <InputGroup label="Mật khẩu mới" name="newPassword" type="password" />
          <InputGroup label="Xác nhận mật khẩu mới" name="confirmPassword" type="password" />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin/profile" submitLabel="Đổi mật khẩu" />
      </AdminForm>
    </div>
  );
}
