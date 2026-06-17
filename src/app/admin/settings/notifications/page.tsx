'use client';

import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Checkbox } from '@/components/admin/AdminForm';

const notificationSettings = [
  { id: 'new_user', label: 'Người dùng mới đăng ký', description: 'Thông báo khi có người dùng mới', defaultChecked: true },
  { id: 'new_order', label: 'Đơn hàng mới', description: 'Thông báo khi có đơn hàng mới', defaultChecked: true },
  { id: 'payment', label: 'Thanh toán thành công', description: 'Thông báo khi thanh toán hoàn tất', defaultChecked: true },
  { id: 'comment', label: 'Bình luận mới', description: 'Thông báo bình luận cần duyệt', defaultChecked: false },
  { id: 'support', label: 'Ticket hỗ trợ', description: 'Thông báo ticket mới', defaultChecked: true },
  { id: 'system', label: 'Cập nhật hệ thống', description: 'Thông báo bảo trì và cập nhật', defaultChecked: false },
];

export default function NotificationSettingsPage() {
  return (
    <div>
      <AdminPageHeader title="Cài đặt thông báo" description="Quản lý loại thông báo nhận được" />
      <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-5 md:p-6 shadow-theme-xs space-y-4">
        {notificationSettings.map((setting) => (
          <label key={setting.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition">
            <Checkbox defaultChecked={setting.defaultChecked} className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{setting.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{setting.description}</p>
            </div>
          </label>
        ))}
        <button
          type="button"
          onClick={() => toast.success('Đã lưu cài đặt thông báo')}
          className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition mt-4"
        >
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
}
