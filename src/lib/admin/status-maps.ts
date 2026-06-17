'use client';

import { toast } from 'sonner';

export const userStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  inactive: { label: 'Không hoạt động', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
  locked: { label: 'Đã khóa', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
};

export const orderStatusMap = {
  completed: { label: 'Hoàn thành', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  pending: { label: 'Chờ xử lý', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
  cancelled: { label: 'Đã hủy', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
  refunded: { label: 'Hoàn tiền', className: 'bg-gray-100 text-gray-600 dark:bg-white/5' },
};

export const articleStatusMap = {
  published: { label: 'Đã đăng', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  draft: { label: 'Nháp', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
  scheduled: { label: 'Lên lịch', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
};

export const commentStatusMap = {
  approved: { label: 'Đã duyệt', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  pending: { label: 'Chờ duyệt', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
  hidden: { label: 'Đã ẩn', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
  reported: { label: 'Báo cáo', className: 'bg-error-50 text-error-600 dark:bg-error-500/10' },
};

export const bannerStatusMap = {
  active: { label: 'Đang hiển thị', className: 'bg-success-50 text-success-600 dark:bg-success-600/10' },
  inactive: { label: 'Tắt', className: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400' },
  scheduled: { label: 'Lên lịch', className: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10' },
};

export function handleRowAction(action: string, name: string) {
  toast.success(`${action}: ${name}`);
}
