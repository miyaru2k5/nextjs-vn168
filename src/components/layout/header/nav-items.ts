export const navItems = [
  {
    type: 'link',
    href: '/',
    label: 'Trang chủ',
  },
  {
    type: 'link',
    label: 'Trò chuyện',
    href: '/text-generator',
  },
  {
    type: 'link',
    label: 'Tin tức',
    href: '/tin-tuc',
  },
  {
    type: 'link',
    label: 'Tuyển dụng',
    href: '/tuyen-dung',
  },
  {
    type: 'link',
    label: 'Bảng giá',
    href: '/pricing',
  },
  {
    type: 'link',
    label: 'Liên hệ',
    href: '/contact',
  },
  {
    type: 'dropdown',
    label: 'Trang',
    items: [
      { href: '/signin', label: 'Đăng nhập' },
      { href: '/signup', label: 'Đăng ký' },
      { href: '/reset-password', label: 'Đặt lại mật khẩu' },
      { href: '/not-found', label: 'Lỗi 404' },
    ],
  },
] satisfies NavItem[];

type NavItem = Record<string, string | unknown> &
  (
    | {
        type: 'link';
        href: string;
      }
    | {
        type: 'dropdown';
      }
  );
