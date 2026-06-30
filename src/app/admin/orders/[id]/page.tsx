import { notFound } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { StatusBadge } from '@/components/admin/DataTable';
import { getOrders } from '@/lib/seed';
import { orderStatusMap } from '@/lib/admin/status-maps';

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const orders = await getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div>
      <AdminPageHeader title={`Đơn hàng ${order.id}`} description={`Khách hàng: ${order.customer}`} />
      <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-theme-xs">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><dt className="text-gray-500">Mã đơn</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{order.id}</dd></div>
          <div><dt className="text-gray-500">Trạng thái</dt><dd className="mt-1"><StatusBadge status={order.status} map={orderStatusMap} /></dd></div>
          <div><dt className="text-gray-500">Khách hàng</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{order.customer}</dd></div>
          <div><dt className="text-gray-500">Email</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{order.email}</dd></div>
          <div><dt className="text-gray-500">Gói dịch vụ</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{order.package}</dd></div>
          <div><dt className="text-gray-500">Số tiền</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">₫{order.amount.toLocaleString('vi-VN')}</dd></div>
          <div><dt className="text-gray-500">Ngày tạo</dt><dd className="font-medium text-gray-900 dark:text-white mt-1">{order.createdAt}</dd></div>
        </dl>
      </div>
    </div>
  );
}
