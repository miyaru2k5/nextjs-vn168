'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { AdminForm, AdminFormSection, AdminFormActions, InputGroup, AdminSelect } from '@/components/admin/AdminForm';

export default function NewBannerPage() {
  return (
    <div>
      <AdminPageHeader title="Thêm banner mới" />
      <AdminForm onSubmit={() => toast.success('Đã tạo banner')}>
        <AdminFormSection title="Thông tin banner">
          <InputGroup label="Tiêu đề" name="title" />
          <AdminSelect label="Vị trí hiển thị" name="position" options={[
            { value: 'hero', label: 'Trang chủ - Hero' },
            { value: 'sidebar', label: 'Sidebar' },
            { value: 'pricing', label: 'Trang Pricing' },
          ]} />
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload ảnh</label>
            <div className="mt-1.5 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-primary-300 transition cursor-pointer">
              <p className="text-sm text-gray-500 dark:text-gray-400">Kéo thả hoặc click để upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG tối đa 5MB</p>
            </div>
          </div>
          <InputGroup label="Ngày bắt đầu" name="startDate" type="date" />
          <InputGroup label="Ngày kết thúc" name="endDate" type="date" />
        </AdminFormSection>
        <AdminFormActions cancelHref="/admin/banners" submitLabel="Tạo banner" />
      </AdminForm>
    </div>
  );
}
