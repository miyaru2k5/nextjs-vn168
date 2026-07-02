'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminTextarea } from '@/components/admin/AdminForm';

export default function WebsiteSettingsPage() {
  return (
    <div>
      <AdminPageHeader title="Cài đặt Website" description="Cấu hình thông tin website" />
      <AdminForm onSubmit={() => toast.success('Đã lưu cài đặt website')}>
        <AdminFormSection title="Thông tin chung">
          <InputGroup label="Tên website" name="siteName" defaultValue="Beauty-Spa" />
          <InputGroup label="URL" name="siteUrl" defaultValue="https://aistarterkit.com" />
          <InputGroup label="Email liên hệ" name="contactEmail" defaultValue="contact@aistarterkit.com" />
          <InputGroup label="Số điện thoại" name="phone" defaultValue="1900 1234" />
          <AdminTextarea label="Mô tả website" name="description" defaultValue="Nền tảng AI SaaS hàng đầu Việt Nam" />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin" submitLabel="Lưu cài đặt" />
      </AdminForm>
    </div>
  );
}
