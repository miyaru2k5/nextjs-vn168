'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminTextarea } from '@/components/admin/AdminForm';

export default function SEOSettingsPage() {
  return (
    <div>
      <AdminPageHeader title="Cài đặt SEO" description="Tối ưu hóa công cụ tìm kiếm" />
      <AdminForm onSubmit={() => toast.success('Đã lưu cài đặt SEO')}>
        <AdminFormSection title="Meta Tags">
          <InputGroup label="Meta Title" name="metaTitle" defaultValue="AI Starter Kit - Nền tảng AI SaaS" />
          <AdminTextarea label="Meta Description" name="metaDescription" defaultValue="Khám phá sức mạnh AI với AI Starter Kit..." />
          <div className="md:col-span-2">
            <InputGroup label="Meta Keywords" name="metaKeywords" defaultValue="AI, SaaS, text generator" />
          </div>
        </AdminFormSection>
        <AdminFormSection title="Social Media">
          <InputGroup label="OG Title" name="ogTitle" defaultValue="AI Starter Kit" />
          <InputGroup label="OG Image URL" name="ogImage" defaultValue="/images/hero/hero-img.webp" />
          <InputGroup label="Twitter Handle" name="twitter" defaultValue="@aistarterkit" />
          <InputGroup label="Google Analytics ID" name="gaId" defaultValue="G-XXXXXXXXXX" />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin" submitLabel="Lưu cài đặt" />
      </AdminForm>
    </div>
  );
}
