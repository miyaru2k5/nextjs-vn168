'use client';

import { toast } from 'sonner';
import { notFound, useParams } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect } from '@/components/admin/AdminForm';
import { useUsers } from '@/lib/admin/use-admin-data';

export default function EditUserPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: users } = useUsers();
  const user = users.find((u) => u.id === id);
  if (users.length > 0 && !user) notFound();
  if (!user) return null;

  return (
    <div>
      <AdminPageHeader title={`Chỉnh sửa: ${user.name}`} description="Cập nhật thông tin người dùng" />
      <AdminForm onSubmit={() => toast.success('Đã cập nhật người dùng')}>
        <AdminFormSection title="Thông tin cơ bản">
          <InputGroup label="Họ và tên" name="name" defaultValue={user.name} />
          <InputGroup label="Email" name="email" type="email" defaultValue={user.email} />
          <AdminSelect
            label="Vai trò"
            name="role"
            defaultValue={user.role.toLowerCase()}
            options={[
              { value: 'user', label: 'User' },
              { value: 'pro', label: 'Pro' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <AdminSelect
            label="Trạng thái"
            name="status"
            defaultValue={user.status}
            options={[
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Không hoạt động' },
              { value: 'locked', label: 'Đã khóa' },
            ]}
          />
        </AdminFormSection>
        <AdminFormActions cancelHref={`/admin/users/${user.id}`} />
      </AdminForm>
    </div>
  );
}
