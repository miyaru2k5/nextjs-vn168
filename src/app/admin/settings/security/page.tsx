'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect, Checkbox } from '@/components/admin/AdminForm';

export default function SecuritySettingsPage() {
  return (
    <div>
      <AdminPageHeader title="Cài đặt bảo mật" description="Cấu hình bảo mật hệ thống" />
      <AdminForm onSubmit={() => toast.success('Đã lưu cài đặt bảo mật')}>
        <AdminFormSection title="Xác thực">
          <AdminSelect label="Phương thức 2FA" name="twoFactor" defaultValue="optional" options={[
            { value: 'disabled', label: 'Tắt' },
            { value: 'optional', label: 'Tùy chọn' },
            { value: 'required', label: 'Bắt buộc' },
          ]} />
          <InputGroup label="Thời gian session (phút)" name="sessionTimeout" defaultValue="60" type="number" />
          <InputGroup label="Số lần đăng nhập sai tối đa" name="maxAttempts" defaultValue="5" type="number" />
          <InputGroup label="Thời gian khóa (phút)" name="lockDuration" defaultValue="15" type="number" />
        </AdminFormSection>
        <AdminFormSection title="Tùy chọn">
          <label className="flex items-center gap-3 md:col-span-2">
            <Checkbox defaultChecked />
            <span className="text-sm text-gray-700 dark:text-gray-300">Yêu cầu mật khẩu mạnh</span>
          </label>
          <label className="flex items-center gap-3 md:col-span-2">
            <Checkbox defaultChecked />
            <span className="text-sm text-gray-700 dark:text-gray-300">Ghi log hoạt động admin</span>
          </label>
          <label className="flex items-center gap-3 md:col-span-2">
            <Checkbox />
            <span className="text-sm text-gray-700 dark:text-gray-300">Giới hạn IP truy cập admin</span>
          </label>
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin" submitLabel="Lưu cài đặt" />
      </AdminForm>
    </div>
  );
}
