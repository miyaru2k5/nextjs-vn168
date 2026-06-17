'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect } from '@/components/admin/AdminForm';

export default function NewUserPage() {
  return (
    <div>
      <AdminPageHeader title="Thêm người dùng mới" description="Tạo tài khoản người dùng mới trong hệ thống" />
      <AdminForm onSubmit={() => toast.success('Đã tạo người dùng mới')}>
        <AdminFormSection title="Thông tin cơ bản">
          <InputGroup label="Họ và tên" name="name" placeholder="Nhập họ tên" />
          <InputGroup label="Email" name="email" type="email" placeholder="email@example.com" />
          <InputGroup label="Số điện thoại" name="phone" placeholder="0901234567" />
          <AdminSelect
            label="Vai trò"
            name="role"
            options={[
              { value: 'user', label: 'User' },
              { value: 'pro', label: 'Pro' },
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
            ]}
          />
          <AdminSelect
            label="Trạng thái"
            name="status"
            options={[
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Không hoạt động' },
            ]}
          />
          <InputGroup label="Mật khẩu" name="password" type="password" placeholder="••••••••" />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin/users" submitLabel="Tạo người dùng" />
      </AdminForm>
    </div>
  );
}
