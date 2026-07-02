'use client';

import { toast } from 'sonner';
import Image from 'next/image';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup } from '@/components/admin/AdminForm';
import { currentAdmin } from '@/lib/admin/navigation';

export default function ProfilePage() {
  return (
    <div>
      <AdminPageHeader title="Hồ sơ cá nhân" description="Quản lý thông tin tài khoản admin" />
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 p-6 bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 shadow-theme-xs">
        <div className="relative size-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
          <Image src={currentAdmin.avatar} alt={currentAdmin.name} fill sizes="80px" className="object-cover" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{currentAdmin.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{currentAdmin.email}</p>
          <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{currentAdmin.role}</p>
        </div>
      </div>
      <AdminForm onSubmit={() => toast.success('Đã cập nhật hồ sơ')}>
        <AdminFormSection title="Thông tin cá nhân">
          <InputGroup label="Họ và tên" name="name" defaultValue={currentAdmin.name} />
          <InputGroup label="Email" name="email" type="email" defaultValue={currentAdmin.email} />
          <InputGroup label="Số điện thoại" name="phone" defaultValue="0901234567" />
          <InputGroup label="Chức vụ" name="role" defaultValue={currentAdmin.role} />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin" submitLabel="Cập nhật hồ sơ" />
      </AdminForm>
    </div>
  );
}
