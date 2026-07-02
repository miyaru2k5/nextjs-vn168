export type NavItem = {
  label: string;
  href?: string;
  icon: string;
  children?: NavItem[];
};

export const adminNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    children: [{ label: 'Tổng quan', href: '/admin', icon: 'overview' }],
  },
  {
    label: 'Quản lý người dùng',
    icon: 'users',
    children: [
      { label: 'Danh sách người dùng', href: '/admin/users', icon: 'user-list' },
      { label: 'Vai trò', href: '/admin/roles', icon: 'roles' },
      { label: 'Phân quyền', href: '/admin/permissions', icon: 'permissions' },
    ],
  },
  {
    label: 'Quản lý nội dung',
    icon: 'content',
    children: [
      { label: 'Bài viết', href: '/admin/articles', icon: 'articles' },
      { label: 'Danh mục', href: '/admin/categories', icon: 'categories' },
      { label: 'Bình luận', href: '/admin/comments', icon: 'comments' },
      { label: 'Banner', href: '/admin/banners', icon: 'banners' },
    ],
  },
  {
    label: 'Quản lý AI',
    icon: 'ai',
    children: [
      { label: 'Công cụ AI', href: '/admin/ai-tools', icon: 'ai-tools' },
      { label: 'Lịch sử sử dụng', href: '/admin/ai-tools/history', icon: 'history' },
      { label: 'API Key', href: '/admin/ai-tools/api-keys', icon: 'api-key' },
      { label: 'Thống kê Token', href: '/admin/ai-tools/token-stats', icon: 'token' },
    ],
  },
  {
    label: 'Quản lý thương mại',
    icon: 'commerce',
    children: [
      { label: 'Đơn hàng', href: '/admin/orders', icon: 'orders' },
      { label: 'Thanh toán', href: '/admin/payments', icon: 'payments' },
      { label: 'Gói dịch vụ', href: '/admin/payments/packages', icon: 'packages' },
      { label: 'Hóa đơn', href: '/admin/payments/invoices', icon: 'invoices' },
    ],
  },
  {
    label: 'Khách hàng',
    icon: 'customers',
    children: [
      { label: 'Danh sách', href: '/admin/customers', icon: 'customer-list' },
      { label: 'Liên hệ', href: '/admin/customers/contacts', icon: 'contacts' },
      { label: 'Hỗ trợ', href: '/admin/customers/support', icon: 'support' },
    ],
  },
  {
    label: 'Báo cáo',
    icon: 'reports',
    children: [
      { label: 'Doanh thu', href: '/admin/reports/revenue', icon: 'revenue' },
      { label: 'Người dùng', href: '/admin/reports/users', icon: 'report-users' },
      { label: 'Lượt truy cập', href: '/admin/reports/traffic', icon: 'traffic' },
      { label: 'Hiệu suất', href: '/admin/reports/performance', icon: 'performance' },
    ],
  },
  {
    label: 'Cài đặt',
    icon: 'settings',
    children: [
      { label: 'Website', href: '/admin/settings/website', icon: 'website' },
      { label: 'SEO', href: '/admin/settings/seo', icon: 'seo' },
      { label: 'Email', href: '/admin/settings/email', icon: 'email' },
      { label: 'Thông báo', href: '/admin/settings/notifications', icon: 'notifications' },
      { label: 'Bảo mật', href: '/admin/settings/security', icon: 'security' },
    ],
  },
  {
    label: 'Tài khoản',
    icon: 'account',
    children: [
      { label: 'Hồ sơ', href: '/admin/profile', icon: 'profile' },
      { label: 'Đổi mật khẩu', href: '/admin/profile/change-password', icon: 'password' },
    ],
  },
];

export type BreadcrumbItem = { label: string; href?: string };

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: 'Admin', href: '/admin' }];

  for (const group of adminNavItems) {
    for (const item of group.children ?? []) {
      if (item.href === pathname) {
        crumbs.push({ label: group.label });
        crumbs.push({ label: item.label });
        return crumbs;
      }
      if (item.href && pathname.startsWith(item.href + '/')) {
        crumbs.push({ label: group.label });
        crumbs.push({ label: item.label, href: item.href });
        return crumbs;
      }
    }
  }

  if (pathname !== '/admin') {
    const segment = pathname.split('/').pop()?.replace(/-/g, ' ') ?? '';
    crumbs.push({ label: segment.charAt(0).toUpperCase() + segment.slice(1) });
  }

  return crumbs;
}

export type SearchCommandItem = {
  id: string;
  label: string;
  href: string;
  group: string;
  keywords?: string[];
};

export function getSearchItems(): SearchCommandItem[] {
  const items: SearchCommandItem[] = [];

  for (const group of adminNavItems) {
    for (const item of group.children ?? []) {
      if (item.href) {
        items.push({
          id: item.href,
          label: item.label,
          href: item.href,
          group: group.label,
          keywords: [group.label, item.label],
        });
      }
    }
  }

  return items;
}

export type AdminUser = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export const currentAdmin: AdminUser = {
  name: 'Nguyễn Văn Admin',
  email: 'admin@aistarterkit.com',
  role: 'Super Admin',
  avatar: '/images/logo-black.png',
};

export type IconName = NavItem['icon'];
