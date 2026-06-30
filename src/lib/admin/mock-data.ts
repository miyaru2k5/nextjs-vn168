export const dashboardStats = [
  {
    title: 'Tổng người dùng',
    value: '12,847',
    change: 12.5,
    trend: [40, 55, 45, 60, 52, 68, 72],
    icon: 'users' as const,
  },
  {
    title: 'Người dùng mới',
    value: '384',
    change: 8.2,
    trend: [20, 25, 30, 28, 35, 38, 42],
    icon: 'user-plus' as const,
  },
  {
    title: 'Tổng doanh thu',
    value: '₫248.5M',
    change: 15.3,
    trend: [30, 45, 40, 55, 50, 65, 70],
    icon: 'revenue' as const,
  },
  {
    title: 'Đơn hàng',
    value: '1,284',
    change: -2.4,
    trend: [50, 48, 52, 45, 50, 47, 49],
    icon: 'orders' as const,
  },
  {
    title: 'Lượt truy cập',
    value: '89,432',
    change: 22.1,
    trend: [60, 65, 70, 75, 80, 85, 90],
    icon: 'traffic' as const,
  },
  {
    title: 'Bài viết',
    value: '256',
    change: 5.7,
    trend: [10, 12, 15, 14, 18, 20, 22],
    icon: 'articles' as const,
  },
];

export const revenueChartData = [
  { month: 'T1', revenue: 18000000, orders: 120 },
  { month: 'T2', revenue: 22000000, orders: 145 },
  { month: 'T3', revenue: 19500000, orders: 130 },
  { month: 'T4', revenue: 28000000, orders: 175 },
  { month: 'T5', revenue: 32000000, orders: 190 },
  { month: 'T6', revenue: 35000000, orders: 210 },
  { month: 'T7', revenue: 31000000, orders: 195 },
  { month: 'T8', revenue: 38000000, orders: 225 },
  { month: 'T9', revenue: 42000000, orders: 240 },
  { month: 'T10', revenue: 45000000, orders: 260 },
  { month: 'T11', revenue: 48000000, orders: 275 },
  { month: 'T12', revenue: 52000000, orders: 290 },
];

export const userGrowthData = [
  { month: 'T1', users: 8200, active: 6100 },
  { month: 'T2', users: 8800, active: 6500 },
  { month: 'T3', users: 9100, active: 6800 },
  { month: 'T4', users: 9600, active: 7200 },
  { month: 'T5', users: 10200, active: 7600 },
  { month: 'T6', users: 10800, active: 8100 },
  { month: 'T7', users: 11200, active: 8400 },
  { month: 'T8', users: 11600, active: 8700 },
  { month: 'T9', users: 12000, active: 9000 },
  { month: 'T10', users: 12300, active: 9200 },
  { month: 'T11', users: 12600, active: 9400 },
  { month: 'T12', users: 12847, active: 9600 },
];

export const trafficSourceData = [
  { name: 'Organic', value: 35, color: '#7a5af8' },
  { name: 'Direct', value: 25, color: '#6938ef' },
  { name: 'Social', value: 20, color: '#9b8afb' },
  { name: 'Referral', value: 12, color: '#bdb4fe' },
  { name: 'Email', value: 8, color: '#d9d6fe' },
];

export const deviceData = [
  { name: 'Desktop', value: 52, color: '#7a5af8' },
  { name: 'Mobile', value: 38, color: '#6938ef' },
  { name: 'Tablet', value: 10, color: '#9b8afb' },
];

export const conversionData = [
  { stage: 'Truy cập', value: 89432 },
  { stage: 'Đăng ký', value: 3840 },
  { stage: 'Dùng thử', value: 1920 },
  { stage: 'Thanh toán', value: 768 },
  { stage: 'Gia hạn', value: 512 },
];

export const recentActivities = [
  {
    id: '1',
    type: 'user',
    message: 'Nguyễn Thị Lan đã đăng ký tài khoản mới',
    time: '5 phút trước',
  },
  {
    id: '2',
    type: 'order',
    message: 'Đơn hàng #ORD-2847 đã được thanh toán',
    time: '12 phút trước',
  },
  {
    id: '3',
    type: 'comment',
    message: 'Bình luận mới trên bài "Hướng dẫn AI"',
    time: '25 phút trước',
  },
  {
    id: '4',
    type: 'admin',
    message: 'Admin cập nhật cài đặt SEO website',
    time: '1 giờ trước',
  },
  {
    id: '5',
    type: 'user',
    message: 'Trần Văn Minh nâng cấp gói Pro',
    time: '2 giờ trước',
  },
];

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'locked';
  createdAt: string;
  avatar?: string;
};

export const mockUsers: UserRecord[] = [
  { id: '1', name: 'Nguyễn Thị Lan', email: 'lan.nguyen@email.com', role: 'User', status: 'active', createdAt: '2025-06-15' },
  { id: '2', name: 'Trần Văn Minh', email: 'minh.tran@email.com', role: 'Pro', status: 'active', createdAt: '2025-06-14' },
  { id: '3', name: 'Lê Hoàng An', email: 'an.le@email.com', role: 'User', status: 'inactive', createdAt: '2025-06-13' },
  { id: '4', name: 'Phạm Thu Hà', email: 'ha.pham@email.com', role: 'Admin', status: 'active', createdAt: '2025-06-12' },
  { id: '5', name: 'Hoàng Đức Bình', email: 'binh.hoang@email.com', role: 'User', status: 'locked', createdAt: '2025-06-11' },
  { id: '6', name: 'Vũ Thị Mai', email: 'mai.vu@email.com', role: 'Pro', status: 'active', createdAt: '2025-06-10' },
  { id: '7', name: 'Đặng Quốc Huy', email: 'huy.dang@email.com', role: 'User', status: 'active', createdAt: '2025-06-09' },
  { id: '8', name: 'Bùi Thanh Tùng', email: 'tung.bui@email.com', role: 'User', status: 'active', createdAt: '2025-06-08' },
];

export type ArticleRecord = {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled';
  views: number;
  createdAt: string;
};

export const mockArticles: ArticleRecord[] = [
  { id: '1', title: 'Hướng dẫn sử dụng AI Text Generator', category: 'Hướng dẫn', author: 'Admin', status: 'published', views: 2840, createdAt: '2025-06-15' },
  { id: '2', title: '10 mẹo viết content hiệu quả với AI', category: 'Marketing', author: 'Nguyễn Lan', status: 'published', views: 1920, createdAt: '2025-06-14' },
  { id: '3', title: 'So sánh các gói dịch vụ VN168', category: 'Sản phẩm', author: 'Admin', status: 'draft', views: 0, createdAt: '2025-06-13' },
  { id: '4', title: 'Cập nhật tính năng mới tháng 6', category: 'Tin tức', author: 'Trần Minh', status: 'scheduled', views: 0, createdAt: '2025-06-12' },
  { id: '5', title: 'Bảo mật dữ liệu người dùng', category: 'Bảo mật', author: 'Admin', status: 'published', views: 980, createdAt: '2025-06-11' },
];

export type OrderRecord = {
  id: string;
  customer: string;
  email: string;
  package: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  createdAt: string;
};

export const mockOrders: OrderRecord[] = [
  { id: 'ORD-2847', customer: 'Trần Văn Minh', email: 'minh.tran@email.com', package: 'Pro', amount: 499000, status: 'completed', createdAt: '2025-06-17' },
  { id: 'ORD-2846', customer: 'Nguyễn Thị Lan', email: 'lan.nguyen@email.com', package: 'Starter', amount: 199000, status: 'completed', createdAt: '2025-06-17' },
  { id: 'ORD-2845', customer: 'Lê Hoàng An', email: 'an.le@email.com', package: 'Enterprise', amount: 999000, status: 'pending', createdAt: '2025-06-16' },
  { id: 'ORD-2844', customer: 'Phạm Thu Hà', email: 'ha.pham@email.com', package: 'Pro', amount: 499000, status: 'completed', createdAt: '2025-06-16' },
  { id: 'ORD-2843', customer: 'Hoàng Đức Bình', email: 'binh.hoang@email.com', package: 'Starter', amount: 199000, status: 'cancelled', createdAt: '2025-06-15' },
];

export type RoleRecord = {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: number;
  createdAt: string;
};

export const mockRoles: RoleRecord[] = [
  { id: '1', name: 'Super Admin', description: 'Toàn quyền hệ thống', users: 2, permissions: 48, createdAt: '2025-01-01' },
  { id: '2', name: 'Admin', description: 'Quản trị nội dung và người dùng', users: 5, permissions: 32, createdAt: '2025-01-01' },
  { id: '3', name: 'Editor', description: 'Quản lý bài viết và danh mục', users: 8, permissions: 16, createdAt: '2025-01-01' },
  { id: '4', name: 'Support', description: 'Hỗ trợ khách hàng', users: 12, permissions: 8, createdAt: '2025-01-01' },
  { id: '5', name: 'User', description: 'Người dùng thông thường', users: 12820, permissions: 4, createdAt: '2025-01-01' },
];

export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  articles: number;
  status: 'active' | 'inactive';
};

export const mockCategories: CategoryRecord[] = [
  { id: '1', name: 'Hướng dẫn', slug: 'huong-dan', parent: null, articles: 24, status: 'active' },
  { id: '2', name: 'Marketing', slug: 'marketing', parent: null, articles: 18, status: 'active' },
  { id: '3', name: 'SEO', slug: 'seo', parent: 'Marketing', articles: 12, status: 'active' },
  { id: '4', name: 'Content', slug: 'content', parent: 'Marketing', articles: 6, status: 'active' },
  { id: '5', name: 'Tin tức', slug: 'tin-tuc', parent: null, articles: 32, status: 'active' },
  { id: '6', name: 'Sản phẩm', slug: 'san-pham', parent: null, articles: 8, status: 'inactive' },
];

export type CommentRecord = {
  id: string;
  author: string;
  content: string;
  article: string;
  status: 'approved' | 'pending' | 'hidden' | 'reported';
  createdAt: string;
};

export const mockComments: CommentRecord[] = [
  { id: '1', author: 'Nguyễn Lan', content: 'Bài viết rất hữu ích, cảm ơn admin!', article: 'Hướng dẫn AI Text Generator', status: 'approved', createdAt: '2025-06-17' },
  { id: '2', author: 'Trần Minh', content: 'Có thể thêm phần hướng dẫn API không?', article: 'Hướng dẫn AI Text Generator', status: 'pending', createdAt: '2025-06-17' },
  { id: '3', author: 'Anonymous', content: 'Spam content here...', article: '10 mẹo viết content', status: 'reported', createdAt: '2025-06-16' },
  { id: '4', author: 'Lê An', content: 'Tôi đã thử và rất hài lòng', article: '10 mẹo viết content', status: 'approved', createdAt: '2025-06-16' },
  { id: '5', author: 'Phạm Hà', content: 'Nội dung cần cập nhật thêm', article: 'Bảo mật dữ liệu', status: 'hidden', createdAt: '2025-06-15' },
];

export type BannerRecord = {
  id: string;
  title: string;
  position: string;
  image: string;
  status: 'active' | 'inactive' | 'scheduled';
  startDate: string;
  endDate: string;
};

export const mockBanners: BannerRecord[] = [
  { id: '1', title: 'Hero Banner - Summer Sale', position: 'Trang chủ - Hero', image: '/images/hero/hero-img.webp', status: 'active', startDate: '2025-06-01', endDate: '2025-06-30' },
  { id: '2', title: 'Sidebar Promo', position: 'Sidebar', image: '/images/hero/hero-img.webp', status: 'active', startDate: '2025-06-01', endDate: '2025-12-31' },
  { id: '3', title: 'Pricing Banner', position: 'Trang Pricing', image: '/images/hero/hero-img.webp', status: 'scheduled', startDate: '2025-07-01', endDate: '2025-07-31' },
];

export type CustomerRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: string;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinedAt: string;
};

export const mockCustomers: CustomerRecord[] = [
  { id: '1', name: 'Trần Văn Minh', email: 'minh.tran@email.com', phone: '0901234567', package: 'Pro', totalSpent: 2495000, status: 'active', joinedAt: '2025-03-15' },
  { id: '2', name: 'Nguyễn Thị Lan', email: 'lan.nguyen@email.com', phone: '0912345678', package: 'Starter', totalSpent: 597000, status: 'active', joinedAt: '2025-04-20' },
  { id: '3', name: 'Lê Hoàng An', email: 'an.le@email.com', phone: '0923456789', package: 'Enterprise', totalSpent: 4995000, status: 'active', joinedAt: '2025-02-10' },
  { id: '4', name: 'Phạm Thu Hà', email: 'ha.pham@email.com', phone: '0934567890', package: 'Pro', totalSpent: 1497000, status: 'inactive', joinedAt: '2025-01-05' },
];

export const mockNotifications = [
  { id: '1', title: 'Đơn hàng mới', message: 'ORD-2847 vừa được thanh toán', time: '5 phút trước', read: false },
  { id: '2', title: 'Người dùng mới', message: 'Nguyễn Thị Lan đã đăng ký', time: '12 phút trước', read: false },
  { id: '3', title: 'Bình luận chờ duyệt', message: '3 bình luận cần xem xét', time: '30 phút trước', read: false },
  { id: '4', title: 'Cập nhật hệ thống', message: 'Phiên bản 1.2.0 đã sẵn sàng', time: '2 giờ trước', read: true },
  { id: '5', title: 'Báo cáo tuần', message: 'Báo cáo doanh thu tuần 24', time: '1 ngày trước', read: true },
];

export const mockMessages = [
  { id: '1', from: 'Trần Văn Minh', message: 'Xin hỏi về gói Enterprise...', time: '10 phút trước', read: false },
  { id: '2', from: 'Nguyễn Thị Lan', message: 'Cần hỗ trợ reset API key', time: '25 phút trước', read: false },
  { id: '3', from: 'Lê Hoàng An', message: 'Cảm ơn đội ngũ hỗ trợ!', time: '1 giờ trước', read: true },
];

// ======================
// Reports, Payments, AI Tools - New Records for Seeding
// ======================

export type InvoiceRecord = {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
};

export const mockInvoices: InvoiceRecord[] = [
  { id: 'INV-001', customer: 'Trần Văn Minh', amount: 499000, status: 'paid', date: '2025-06-17' },
  { id: 'INV-002', customer: 'Nguyễn Thị Lan', amount: 199000, status: 'paid', date: '2025-06-17' },
  { id: 'INV-003', customer: 'Lê Hoàng An', amount: 999000, status: 'pending', date: '2025-06-16' },
  { id: 'INV-004', customer: 'Phạm Thu Hà', amount: 499000, status: 'paid', date: '2025-06-15' },
  { id: 'INV-005', customer: 'Hoàng Đức Bình', amount: 199000, status: 'overdue', date: '2025-06-10' },
];

export type ApiKeyRecord = {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'revoked';
  createdAt: string;
  lastUsed: string;
};

export const mockApiKeys: ApiKeyRecord[] = [
  { id: '1', name: 'Production Key', key: 'sk-****...abc123', status: 'active', createdAt: '2025-01-15', lastUsed: '2025-06-17' },
  { id: '2', name: 'Development Key', key: 'sk-****...def456', status: 'active', createdAt: '2025-02-20', lastUsed: '2025-06-16' },
  { id: '3', name: 'Test Key', key: 'sk-****...ghi789', status: 'revoked', createdAt: '2025-03-10', lastUsed: '2025-05-01' },
];

export type AiToolRecord = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  usage: number;
  tokens: string;
};

export const mockAiTools: AiToolRecord[] = [
  { id: '1', name: 'Text Generator', type: 'Chat', status: 'active', usage: 8420, tokens: '2.4M' },
  { id: '2', name: 'Image Generator', type: 'Image', status: 'active', usage: 3210, tokens: '1.1M' },
  { id: '3', name: 'Code Assistant', type: 'Code', status: 'active', usage: 5680, tokens: '3.2M' },
  { id: '4', name: 'Email Writer', type: 'Text', status: 'inactive', usage: 890, tokens: '0.3M' },
];

export type AiHistoryRecord = {
  id: string;
  user: string;
  tool: string;
  tokens: number;
  duration: string;
  createdAt: string;
};

export const mockAiHistory: AiHistoryRecord[] = [
  { id: '1', user: 'Trần Văn Minh', tool: 'Text Generator', tokens: 1250, duration: '2.3s', createdAt: '2025-06-17 10:30' },
  { id: '2', user: 'Nguyễn Thị Lan', tool: 'Code Assistant', tokens: 3420, duration: '5.1s', createdAt: '2025-06-17 10:15' },
  { id: '3', user: 'Lê Hoàng An', tool: 'Text Generator', tokens: 890, duration: '1.8s', createdAt: '2025-06-17 09:45' },
  { id: '4', user: 'Phạm Thu Hà', tool: 'Image Generator', tokens: 2100, duration: '8.2s', createdAt: '2025-06-17 09:20' },
  { id: '5', user: 'Hoàng Đức Bình', tool: 'Text Generator', tokens: 560, duration: '1.2s', createdAt: '2025-06-17 08:50' },
];

// Additional report-related mocks (for future expansion)
export const mockRevenueReport = {
  monthly: 48200000,
  yearly: 248500000,
  arpu: 193000,
  refundRate: 1.2,
};

export const mockPerformanceReport = {
  uptime: '99.98',
  responseTime: 124,
  errorRate: 0.12,
  apiCallsPerHour: 12400,
};
