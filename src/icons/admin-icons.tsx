type IconProps = { className?: string; size?: number };

export function AdminDashboardIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 3H8.5V8.5H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11.5 3H17V11.5H11.5V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 11.5H8.5V17H3V11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11.5 14.5H17V17H11.5V14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminUsersIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.75 17.5C3.75 14.1863 6.43629 11.5 9.75 11.5H10.25C13.5637 11.5 16.25 14.1863 16.25 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminContentIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 3.5H16V16.5H4V3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminAIIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 2.5L12.5 7.5H17.5L13.75 10.5L15 15.5L10 12.5L5 15.5L6.25 10.5L2.5 7.5H7.5L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminCommerceIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 3H5L6.5 13H15.5L17 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AdminCustomersIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 16V14.5C3 12.0147 5.01472 10 7.5 10H12.5C14.9853 10 17 12.0147 17 14.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AdminReportsIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 16V10M8 16V6M12 16V8M16 16V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminSettingsIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.738 3.042H11.265C11.534 3.042 11.752 3.26 11.752 3.528C11.752 5.057 13.407 6.013 14.731 5.249C14.964 5.114 15.261 5.194 15.395 5.426L16.659 7.615C16.793 7.848 16.713 8.145 16.481 8.28C15.156 9.044 15.156 10.956 16.481 11.72C16.713 11.855 16.793 12.152 16.659 12.385L15.395 14.574C15.261 14.806 14.964 14.886 14.731 14.752C13.407 13.987 11.752 14.943 11.752 16.472C11.752 16.741 11.534 16.958 11.265 16.958H8.738C8.47 16.958 8.252 16.74 8.252 16.472C8.252 14.942 6.596 13.987 5.272 14.751C5.039 14.886 4.741 14.806 4.606 14.574L3.343 12.385C3.209 12.152 3.289 11.855 3.521 11.72C4.846 10.956 4.846 9.044 3.521 8.28C3.289 8.145 3.209 7.848 3.343 7.615L4.606 5.427C4.741 5.194 5.039 5.114 5.272 5.249C6.596 6.013 8.252 5.058 8.252 3.528C8.252 3.26 8.47 3.042 8.738 3.042Z" fill="currentColor" />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AdminAccountIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17C4 13.6863 6.68629 11 10 11C13.3137 11 16 13.6863 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminChevronIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminSearchIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminBellIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 3C7.239 3 5 5.239 5 8V12L3.5 14.5H16.5L15 12V8C15 5.239 12.761 3 10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 14.5C8.5 15.6046 9.17157 16.5 10 16.5C10.8284 16.5 11.5 15.6046 11.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminMessageIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3.5 5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H14.5C15.6046 3.5 16.5 4.39543 16.5 5.5V11.5C16.5 12.6046 15.6046 13.5 14.5 13.5H8L4 16.5V13.5H5.5C4.39543 13.5 3.5 12.6046 3.5 11.5V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminPlusIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminMenuIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminLogoutIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M7.5 17.5H4.5C3.94772 17.5 3.5 17.0523 3.5 16.5V3.5C3.5 2.94772 3.94772 2.5 4.5 2.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 14L17 10L13 6M17 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminExportIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminFilterIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3 5H17M5 10H15M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminEyeIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M2.5 10C2.5 10 5.5 4.5 10 4.5C14.5 4.5 17.5 10 17.5 10C17.5 10 14.5 15.5 10 15.5C5.5 15.5 2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AdminEditIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M13.5 3.5L16.5 6.5L7 16H4V13L13.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminTrashIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M4 6H16M7 6V4.5C7 3.94772 7.44772 3.5 8 3.5H12C12.5523 3.5 13 3.94772 13 4.5V6M6 6V15.5C6 16.0523 6.44772 16.5 7 16.5H13C13.5523 16.5 14 16.0523 14 15.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminLockIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <rect x="5" y="9" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9V6.5C7 4.84315 8.34315 3.5 10 3.5C11.6569 3.5 13 4.84315 13 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminTrendUpIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M12 4.5L8.5 8L6.5 6L4 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 4.5H12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminTrendDownIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M12 11.5L8.5 8L6.5 10L4 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 11.5H12V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  dashboard: AdminDashboardIcon,
  users: AdminUsersIcon,
  content: AdminContentIcon,
  ai: AdminAIIcon,
  commerce: AdminCommerceIcon,
  customers: AdminCustomersIcon,
  reports: AdminReportsIcon,
  settings: AdminSettingsIcon,
  account: AdminAccountIcon,
  overview: AdminDashboardIcon,
  'user-list': AdminUsersIcon,
  roles: AdminUsersIcon,
  permissions: AdminLockIcon,
  articles: AdminContentIcon,
  categories: AdminContentIcon,
  comments: AdminMessageIcon,
  banners: AdminContentIcon,
  'ai-tools': AdminAIIcon,
  history: AdminReportsIcon,
  'api-key': AdminLockIcon,
  token: AdminAIIcon,
  orders: AdminCommerceIcon,
  payments: AdminCommerceIcon,
  packages: AdminCommerceIcon,
  invoices: AdminContentIcon,
  'customer-list': AdminCustomersIcon,
  contacts: AdminMessageIcon,
  support: AdminMessageIcon,
  revenue: AdminReportsIcon,
  'report-users': AdminUsersIcon,
  traffic: AdminReportsIcon,
  performance: AdminReportsIcon,
  website: AdminSettingsIcon,
  seo: AdminSearchIcon,
  email: AdminMessageIcon,
  notifications: AdminBellIcon,
  security: AdminLockIcon,
  profile: AdminAccountIcon,
  password: AdminLockIcon,
};

export function AdminNavIcon({ name, className, size }: { name: string; className?: string; size?: number }) {
  const Icon = iconMap[name] ?? AdminDashboardIcon;
  return <Icon className={className} size={size} />;
}
