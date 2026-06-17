'use client';

import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Checkbox } from '@/components/admin/AdminForm';

const permissionGroups = [
  {
    name: 'Người dùng',
    permissions: ['Xem người dùng', 'Thêm người dùng', 'Sửa người dùng', 'Xóa người dùng', 'Khóa người dùng'],
  },
  {
    name: 'Nội dung',
    permissions: ['Xem bài viết', 'Thêm bài viết', 'Sửa bài viết', 'Xóa bài viết', 'Duyệt bình luận'],
  },
  {
    name: 'Thương mại',
    permissions: ['Xem đơn hàng', 'Xử lý thanh toán', 'Quản lý gói dịch vụ', 'Xuất hóa đơn'],
  },
  {
    name: 'Hệ thống',
    permissions: ['Cài đặt website', 'Quản lý SEO', 'Cấu hình email', 'Bảo mật hệ thống'],
  },
];

export default function PermissionsPage() {
  return (
    <div>
      <AdminPageHeader title="Phân quyền" description="Cấu hình quyền hạn cho từng vai trò" />
      <div className="space-y-4">
        {permissionGroups.map((group) => (
          <div key={group.name} className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-5 md:p-6 shadow-theme-xs">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">{group.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.permissions.map((perm) => (
                <label key={perm} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                  <Checkbox defaultChecked={Math.random() > 0.3} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{perm}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
