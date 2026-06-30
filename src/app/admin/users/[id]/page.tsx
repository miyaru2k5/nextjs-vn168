import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { StatusBadge } from '@/components/admin/DataTable';
import { getUsers } from '@/lib/admin/seed-loader';
import { userStatusMap } from '@/lib/admin/status-maps';

type Props = { params: Promise<{ id: string }> };

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const users = await getUsers();
  const user = users.find((u) => u.id === id);
  if (!user) notFound();

  const timeline = [
    { action: 'Tài khoản được tạo', time: user.createdAt, by: 'System' },
    { action: 'Đăng nhập lần cuối', time: '2025-06-17 09:30', by: user.name },
    { action: 'Cập nhật hồ sơ', time: '2025-06-15 14:20', by: user.name },
  ];

  return (
    <div>
      <AdminPageHeader title={user.name} description={user.email}>
        <Link href={`/admin/users/${id}/edit`} className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition">
          Chỉnh sửa
        </Link>
      </AdminPageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-theme-xs">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Thông tin chi tiết</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><dt className="text-gray-500 dark:text-gray-400">Họ tên</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{user.name}</dd></div>
              <div><dt className="text-gray-500 dark:text-gray-400">Email</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{user.email}</dd></div>
              <div><dt className="text-gray-500 dark:text-gray-400">Vai trò</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{user.role}</dd></div>
              <div><dt className="text-gray-500 dark:text-gray-400">Trạng thái</dt><dd className="mt-1"><StatusBadge status={user.status} map={userStatusMap} /></dd></div>
              <div><dt className="text-gray-500 dark:text-gray-400">Ngày tạo</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{user.createdAt}</dd></div>
            </dl>
          </div>

          <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-theme-xs">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Timeline hoạt động</h2>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.time} · {item.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-theme-xs">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Ghi chú nội bộ</h2>
            <textarea
              className="w-full h-32 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-4 text-sm text-gray-900 dark:text-white resize-none focus:border-primary-300 focus:outline-none focus:ring-3 focus:ring-primary-300/20"
              placeholder="Thêm ghi chú..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
