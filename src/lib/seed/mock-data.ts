// Centralized static mock data in src/lib/seed/mock-data.ts

import type {
  UserRecord,
  ArticleRecord,
  OrderRecord,
  RoleRecord,
  CategoryRecord,
  CommentRecord,
  BannerRecord,
  CustomerRecord,
  InvoiceRecord,
  ApiKeyRecord,
  AiToolRecord,
  AiHistoryRecord,
  RevenueReportData,
  PerformanceReportData,
  TrafficReportData,
  UsersReportData,
  NotificationItem,
  MessageItem,
} from '../admin/types';

import type { BlogPost, BlogComment } from '../blog/types';
import type { JobPost, JobComment } from '../careers/types';

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

export const mockArticles: ArticleRecord[] = [
  { id: '1', title: 'Hướng dẫn sử dụng AI Text Generator', category: 'Hướng dẫn', author: 'Admin', status: 'published', views: 2840, createdAt: '2025-06-15' },
  { id: '2', title: '10 mẹo viết content hiệu quả với AI', category: 'Marketing', author: 'Nguyễn Lan', status: 'published', views: 1920, createdAt: '2025-06-14' },
  { id: '3', title: 'So sánh các gói dịch vụ Beauty-Spa', category: 'Sản phẩm', author: 'Admin', status: 'draft', views: 0, createdAt: '2025-06-13' },
  { id: '4', title: 'Cập nhật tính năng mới tháng 6', category: 'Tin tức', author: 'Trần Minh', status: 'scheduled', views: 0, createdAt: '2025-06-12' },
  { id: '5', title: 'Bảo mật dữ liệu người dùng', category: 'Bảo mật', author: 'Admin', status: 'published', views: 980, createdAt: '2025-06-11' },
];

export const mockOrders: OrderRecord[] = [
  { id: 'ORD-2847', customer: 'Trần Văn Minh', email: 'minh.tran@email.com', package: 'Pro', amount: 499000, status: 'completed', createdAt: '2025-06-17' },
  { id: 'ORD-2846', customer: 'Nguyễn Thị Lan', email: 'lan.nguyen@email.com', package: 'Starter', amount: 199000, status: 'completed', createdAt: '2025-06-17' },
  { id: 'ORD-2845', customer: 'Lê Hoàng An', email: 'an.le@email.com', package: 'Enterprise', amount: 999000, status: 'pending', createdAt: '2025-06-16' },
  { id: 'ORD-2844', customer: 'Phạm Thu Hà', email: 'ha.pham@email.com', package: 'Pro', amount: 499000, status: 'completed', createdAt: '2025-06-16' },
  { id: 'ORD-2843', customer: 'Hoàng Đức Bình', email: 'binh.hoang@email.com', package: 'Starter', amount: 199000, status: 'cancelled', createdAt: '2025-06-15' },
];

export const mockRoles: RoleRecord[] = [
  { id: '1', name: 'Super Admin', description: 'Toàn quyền hệ thống', users: 2, permissions: 48, createdAt: '2025-01-01' },
  { id: '2', name: 'Admin', description: 'Quản trị nội dung và người dùng', users: 5, permissions: 32, createdAt: '2025-01-01' },
  { id: '3', name: 'Editor', description: 'Quản lý bài viết và danh mục', users: 8, permissions: 16, createdAt: '2025-01-01' },
  { id: '4', name: 'Support', description: 'Hỗ trợ khách hàng', users: 12, permissions: 8, createdAt: '2025-01-01' },
  { id: '5', name: 'User', description: 'Người dùng thông thường', users: 12820, permissions: 4, createdAt: '2025-01-01' },
];

export const mockCategories: CategoryRecord[] = [
  { id: '1', name: 'Hướng dẫn', slug: 'huong-dan', parent: null, articles: 24, status: 'active' },
  { id: '2', name: 'Marketing', slug: 'marketing', parent: null, articles: 18, status: 'active' },
  { id: '3', name: 'SEO', slug: 'seo', parent: 'Marketing', articles: 12, status: 'active' },
  { id: '4', name: 'Content', slug: 'content', parent: 'Marketing', articles: 6, status: 'active' },
  { id: '5', name: 'Tin tức', slug: 'tin-tuc', parent: null, articles: 32, status: 'active' },
  { id: '6', name: 'Sản phẩm', slug: 'san-pham', parent: null, articles: 8, status: 'inactive' },
];

export const mockComments: CommentRecord[] = [
  { id: '1', author: 'Nguyễn Lan', content: 'Bài viết rất hữu ích, cảm ơn admin!', article: 'Hướng dẫn AI Text Generator', status: 'approved', createdAt: '2025-06-17' },
  { id: '2', author: 'Trần Minh', content: 'Có thể thêm phần hướng dẫn API không?', article: 'Hướng dẫn AI Text Generator', status: 'pending', createdAt: '2025-06-17' },
  { id: '3', author: 'Anonymous', content: 'Spam content here...', article: '10 mẹo viết content', status: 'reported', createdAt: '2025-06-16' },
  { id: '4', author: 'Lê An', content: 'Tôi đã thử và rất hài lòng', article: '10 mẹo viết content', status: 'approved', createdAt: '2025-06-16' },
  { id: '5', author: 'Phạm Hà', content: 'Nội dung cần cập nhật thêm', article: 'Bảo mật dữ liệu', status: 'hidden', createdAt: '2025-06-15' },
];

export const mockBanners: BannerRecord[] = [
  { id: '1', title: 'Hero Banner - Summer Sale', position: 'Trang chủ - Hero', image: '/images/hero/hero-img.webp', status: 'active', startDate: '2025-06-01', endDate: '2025-06-30' },
  { id: '2', title: 'Sidebar Promo', position: 'Sidebar', image: '/images/hero/hero-img.webp', status: 'active', startDate: '2025-06-01', endDate: '2025-12-31' },
  { id: '3', title: 'Pricing Banner', position: 'Trang Pricing', image: '/images/hero/hero-img.webp', status: 'scheduled', startDate: '2025-07-01', endDate: '2025-07-31' },
];

export const mockCustomers: CustomerRecord[] = [
  { id: '1', name: 'Trần Văn Minh', email: 'minh.tran@email.com', phone: '0901234567', package: 'Pro', totalSpent: 2495000, status: 'active', joinedAt: '2025-03-15' },
  { id: '2', name: 'Nguyễn Thị Lan', email: 'lan.nguyen@email.com', phone: '0912345678', package: 'Starter', totalSpent: 597000, status: 'active', joinedAt: '2025-04-20' },
  { id: '3', name: 'Lê Hoàng An', email: 'an.le@email.com', phone: '0923456789', package: 'Enterprise', totalSpent: 4995000, status: 'active', joinedAt: '2025-02-10' },
  { id: '4', name: 'Phạm Thu Hà', email: 'ha.pham@email.com', phone: '0934567890', package: 'Pro', totalSpent: 1497000, status: 'inactive', joinedAt: '2025-01-05' },
];

export const mockNotifications: NotificationItem[] = [
  { id: '1', title: 'Đơn hàng mới', message: 'ORD-2847 vừa được thanh toán', time: '5 phút trước', read: false },
  { id: '2', title: 'Người dùng mới', message: 'Nguyễn Thị Lan đã đăng ký', time: '12 phút trước', read: false },
  { id: '3', title: 'Bình luận chờ duyệt', message: '3 bình luận cần xem xét', time: '30 phút trước', read: false },
  { id: '4', title: 'Cập nhật hệ thống', message: 'Phiên bản 1.2.0 đã sẵn sàng', time: '2 giờ trước', read: true },
  { id: '5', title: 'Báo cáo tuần', message: 'Báo cáo doanh thu tuần 24', time: '1 ngày trước', read: true },
];

export const mockMessages: MessageItem[] = [
  { id: '1', from: 'Trần Văn Minh', message: 'Xin hỏi về gói Enterprise...', time: '10 phút trước', read: false },
  { id: '2', from: 'Nguyễn Thị Lan', message: 'Cần hỗ trợ reset API key', time: '25 phút trước', read: false },
  { id: '3', from: 'Lê Hoàng An', message: 'Cảm ơn đội ngũ hỗ trợ!', time: '1 giờ trước', read: true },
];

export const mockInvoices: InvoiceRecord[] = [
  { id: 'INV-001', customer: 'Trần Văn Minh', amount: 499000, status: 'paid', date: '2025-06-17' },
  { id: 'INV-002', customer: 'Nguyễn Thị Lan', amount: 199000, status: 'paid', date: '2025-06-17' },
  { id: 'INV-003', customer: 'Lê Hoàng An', amount: 999000, status: 'pending', date: '2025-06-16' },
  { id: 'INV-004', customer: 'Phạm Thu Hà', amount: 499000, status: 'paid', date: '2025-06-15' },
  { id: 'INV-005', customer: 'Hoàng Đức Bình', amount: 199000, status: 'overdue', date: '2025-06-10' },
];

export const mockApiKeys: ApiKeyRecord[] = [
  { id: '1', name: 'Production Key', key: 'sk-****...abc123', status: 'active', createdAt: '2025-01-15', lastUsed: '2025-06-17' },
  { id: '2', name: 'Development Key', key: 'sk-****...def456', status: 'active', createdAt: '2025-02-20', lastUsed: '2025-06-16' },
  { id: '3', name: 'Test Key', key: 'sk-****...ghi789', status: 'revoked', createdAt: '2025-03-10', lastUsed: '2025-05-01' },
];

export const mockAiTools: AiToolRecord[] = [
  { id: '1', name: 'Text Generator', type: 'Chat', status: 'active', usage: 8420, tokens: '2.4M' },
  { id: '2', name: 'Image Generator', type: 'Image', status: 'active', usage: 3210, tokens: '1.1M' },
  { id: '3', name: 'Code Assistant', type: 'Code', status: 'active', usage: 5680, tokens: '3.2M' },
  { id: '4', name: 'Email Writer', type: 'Text', status: 'inactive', usage: 890, tokens: '0.3M' },
];

export const mockAiHistory: AiHistoryRecord[] = [
  { id: '1', user: 'Trần Văn Minh', tool: 'Text Generator', tokens: 1250, duration: '2.3s', createdAt: '2025-06-17 10:30' },
  { id: '2', user: 'Nguyễn Thị Lan', tool: 'Code Assistant', tokens: 3420, duration: '5.1s', createdAt: '2025-06-17 10:15' },
  { id: '3', user: 'Lê Hoàng An', tool: 'Text Generator', tokens: 890, duration: '1.8s', createdAt: '2025-06-17 09:45' },
  { id: '4', user: 'Phạm Thu Hà', tool: 'Image Generator', tokens: 2100, duration: '8.2s', createdAt: '2025-06-17 09:20' },
  { id: '5', user: 'Hoàng Đức Bình', tool: 'Text Generator', tokens: 560, duration: '1.2s', createdAt: '2025-06-17 08:50' },
];

export const mockRevenueReport: RevenueReportData = {
  monthlyRevenue: 48200000,
  yearlyRevenue: 248500000,
  arpu: 193000,
  refundRate: 1.2,
  changeMonthly: 15.3,
  changeYearly: 22.1,
};

export const mockPerformanceReport: PerformanceReportData = {
  uptime: 99.98,
  responseTime: 124,
  errorRate: 0.12,
  apiCallsPerHour: 12400,
  changeUptime: 0.02,
  changeResponseTime: -8.5,
  changeErrorRate: -0.05,
  changeApiCalls: 15.3,
};

export const mockTrafficReport: TrafficReportData = {
  visits: 89432,
  pageviews: 245680,
  bounceRate: 32.5,
  avgTimeOnSite: 222,
  changeVisits: 22.1,
  changePageviews: 18.4,
  changeBounce: -4.2,
  changeAvgTime: 6.8,
};

export const mockUsersReport: UsersReportData = {
  totalUsers: 12847,
  dau: 3240,
  mau: 9600,
  retentionRate: 78.5,
  changeTotal: 12.5,
  changeDau: 8.2,
  changeMau: 10.5,
  changeRetention: 2.1,
};

// ======================
// Blog Mock Data
// ======================

const AUTHORS = {
  admin: {
    name: 'Admin Beauty-Spa',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    role: 'Quản trị viên',
  },
  lan: {
    name: 'Nguyễn Thị Lan',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    role: 'Chuyên gia Content AI',
  },
  minh: {
    name: 'Trần Văn Minh',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
    role: 'Kỹ sư AI',
  },
  ha: {
    name: 'Phạm Thu Hà',
    avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
    role: 'Product Manager',
  },
};

const SAMPLE_CONTENT = `
<h2 id="gioi-thieu">Giới thiệu</h2>
<p>Trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc, sáng tạo và tương tác với công nghệ. Trong bài viết này, chúng ta sẽ khám phá những xu hướng mới nhất và cách ứng dụng chúng vào thực tế.</p>

<blockquote>
<p>"AI không thay thế con người — AI giúp con người làm việc thông minh hơn và hiệu quả hơn."</p>
</blockquote>

<h2 id="xu-huong-chinh">Xu hướng chính năm 2025</h2>
<p>Dưới đây là những xu hướng đáng chú ý nhất trong lĩnh vực AI:</p>

<ul>
<li><strong>Generative AI</strong> — Tạo nội dung văn bản, hình ảnh, video tự động</li>
<li><strong>AI Agents</strong> — Trợ lý tự động thực hiện tác vụ phức tạp</li>
<li><strong>Multimodal AI</strong> — Xử lý đồng thời văn bản, hình ảnh và âm thanh</li>
<li><strong>Edge AI</strong> — Chạy mô hình AI trực tiếp trên thiết bị</li>
</ul>

<h3 id="generative-ai">Generative AI trong thực tế</h3>
<p>Các công cụ như ChatGPT, Claude và Gemini đã trở thành bộ công cụ không thể thiếu cho marketer, developer và creator. Việc tích hợp chúng vào workflow giúp tiết kiệm đến 40% thời gian sản xuất nội dung.</p>

<figure>
<img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop" alt="AI Technology" loading="lazy" />
<figcaption>Hình ảnh minh họa: Công nghệ AI đang phát triển mạnh mẽ</figcaption>
</figure>

<h2 id="ung-dung-doanh-nghiep">Ứng dụng trong doanh nghiệp</h2>
<p>Doanh nghiệp đang áp dụng AI vào nhiều lĩnh vực khác nhau:</p>

<ol>
<li>Chăm sóc khách hàng tự động với chatbot thông minh</li>
<li>Phân tích dữ liệu và dự báo xu hướng thị trường</li>
<li>Tự động hóa quy trình nội bộ và tối ưu vận hành</li>
<li>Cá nhân hóa trải nghiệm người dùng</li>
</ol>

<div class="highlight-box">
<p><strong>Lưu ý quan trọng:</strong> Khi triển khai AI, hãy luôn đặt bảo mật dữ liệu và quyền riêng tư lên hàng đầu. Tuân thủ các quy định pháp luật về bảo vệ dữ liệu cá nhân.</p>
</div>

<h3 id="bang-so-sanh">Bảng so sánh các công cụ AI</h3>
<table>
<thead>
<tr><th>Công cụ</th><th>Điểm mạnh</th><th>Phù hợp cho</th></tr>
</thead>
<tbody>
<tr><td>ChatGPT</td><td>Đa năng, cộng đồng lớn</td><td>Content, Coding</td></tr>
<tr><td>Claude</td><td>Phân tích sâu, an toàn</td><td>Research, Writing</td></tr>
<tr><td>Midjourney</td><td>Tạo hình ảnh chất lượng cao</td><td>Design, Marketing</td></tr>
<tr><td>Beauty-Spa</td><td>Tự host, tùy biến cao</td><td>Startup, SaaS</td></tr>
</tbody>
</table>

<h2 id="code-example">Ví dụ tích hợp API</h2>
<p>Dưới đây là ví dụ gọi API AI trong Next.js:</p>

<pre><code>import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Viết một đoạn giới thiệu sản phẩm AI',
});

console.log(text);</code></pre>

<h2 id="ket-luan">Kết luận</h2>
<p>AI không còn là tương lai — nó đang ở hiện tại. Việc nắm bắt và ứng dụng công nghệ này sớm sẽ giúp bạn và doanh nghiệp của mình giữ vững lợi thế cạnh tranh trong thời đại số.</p>
`;

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'huong-dan-su-dung-ai-text-generator',
    title: 'Hướng dẫn sử dụng AI Text Generator hiệu quả',
    excerpt:
      'Khám phá cách tận dụng tối đa công cụ AI Text Generator để tạo nội dung chất lượng cao, tiết kiệm thời gian và tăng năng suất làm việc.',
    content: SAMPLE_CONTENT,
    category: 'huong-dan',
    tags: ['AI', 'Text Generator', 'Hướng dẫn', 'Productivity'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    author: AUTHORS.admin,
    publishedAt: '2025-06-15',
    readTime: 8,
    views: 2840,
    likes: 156,
  },
  {
    id: '2',
    slug: '10-meo-viet-content-hieu-qua-voi-ai',
    title: '10 mẹo viết content hiệu quả với AI',
    excerpt:
      'Tổng hợp 10 chiến lược thực tế giúp bạn tạo nội dung marketing chất lượng cao bằng công cụ AI, từ prompt engineering đến chỉnh sửa cuối cùng.',
    content: SAMPLE_CONTENT.replace('Giới thiệu', 'Tại sao cần AI cho Content').replace(
      'gioi-thieu',
      'tai-sao'
    ),
    category: 'kinh-doanh',
    tags: ['Marketing', 'Content', 'AI Writing'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop',
    author: AUTHORS.lan,
    publishedAt: '2025-06-14',
    readTime: 6,
    views: 1920,
    likes: 98,
  },
  {
    id: '3',
    slug: 'xu-huong-ai-2025',
    title: 'Xu hướng AI nổi bật năm 2025',
    excerpt:
      'Tổng quan các xu hướng AI đang định hình tương lai công nghệ: từ AI agents, multimodal models đến edge computing và AI tự host.',
    content: SAMPLE_CONTENT,
    category: 'ai',
    tags: ['AI Trends', '2025', 'Technology'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop',
    author: AUTHORS.minh,
    publishedAt: '2025-06-13',
    readTime: 10,
    views: 3450,
    likes: 234,
  },
  {
    id: '4',
    slug: 'cap-nhat-tinh-nang-thang-6',
    title: 'Cập nhật tính năng mới tháng 6/2025',
    excerpt:
      'Ra mắt module Admin Dashboard, cải thiện hiệu năng Text Generator, thêm dark mode cho toàn bộ hệ thống và nhiều tính năng hấp dẫn khác.',
    content: SAMPLE_CONTENT,
    category: 'cap-nhat-san-pham',
    tags: ['Product Update', 'Release Notes', 'Features'],
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    author: AUTHORS.ha,
    publishedAt: '2025-06-12',
    readTime: 5,
    views: 1560,
    likes: 67,
  },
  {
    id: '5',
    slug: 'bao-mat-du-lieu-nguoi-dung',
    title: 'Bảo mật dữ liệu người dùng trong thời đại AI',
    excerpt:
      'Hướng dẫn chi tiết về các biện pháp bảo mật dữ liệu khi triển khai ứng dụng AI, tuân thủ GDPR và các quy định bảo vệ thông tin cá nhân.',
    content: SAMPLE_CONTENT,
    category: 'cong-nghe',
    tags: ['Security', 'Privacy', 'GDPR'],
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop',
    author: AUTHORS.admin,
    publishedAt: '2025-06-11',
    readTime: 7,
    views: 980,
    likes: 45,
  },
  {
    id: '6',
    slug: 'prompt-engineering-co-ban',
    title: 'Prompt Engineering cơ bản cho người mới bắt đầu',
    excerpt:
      'Học cách viết prompt hiệu quả để nhận kết quả tốt nhất từ các mô hình AI. Bao gồm framework, ví dụ thực tế và các lỗi thường gặp.',
    content: SAMPLE_CONTENT,
    category: 'huong-dan',
    tags: ['Prompt Engineering', 'Tutorial', 'AI Basics'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
    author: AUTHORS.lan,
    publishedAt: '2025-06-10',
    readTime: 12,
    views: 4120,
    likes: 312,
  },
  {
    id: '7',
    slug: 'ai-trong-marketing-so-sanh',
    title: 'So sánh các gói dịch vụ Beauty-Spa',
    excerpt:
      'Phân tích chi tiết các gói Starter, Pro và Enterprise — giúp bạn chọn giải pháp phù hợp nhất với nhu cầu và ngân sách của doanh nghiệp.',
    content: SAMPLE_CONTENT,
    category: 'kinh-doanh',
    tags: ['Pricing', 'Comparison', 'SaaS'],
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    author: AUTHORS.ha,
    publishedAt: '2025-06-09',
    readTime: 5,
    views: 890,
    likes: 34,
  },
  {
    id: '8',
    slug: 'nextjs-15-va-ai-sdk',
    title: 'Xây dựng ứng dụng AI với Next.js 15 và AI SDK',
    excerpt:
      'Hướng dẫn từng bước xây dựng ứng dụng AI streaming với Next.js 15 App Router, Vercel AI SDK và OpenAI — phù hợp cho developer.',
    content: SAMPLE_CONTENT,
    category: 'cong-nghe',
    tags: ['Next.js', 'AI SDK', 'Development'],
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
    author: AUTHORS.minh,
    publishedAt: '2025-06-08',
    readTime: 15,
    views: 2340,
    likes: 178,
  },
  {
    id: '9',
    slug: 'chatbot-ai-cho-doanh-nghiep',
    title: 'Triển khai Chatbot AI cho doanh nghiệp vừa và nhỏ',
    excerpt:
      'Case study thực tế về việc triển khai chatbot AI giúp giảm 60% thời gian phản hồi khách hàng và tăng tỷ lệ chuyển đổi đáng kể.',
    content: SAMPLE_CONTENT,
    category: 'ai',
    tags: ['Chatbot', 'Customer Service', 'SMB'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd565?w=1200&h=630&fit=crop',
    author: AUTHORS.lan,
    publishedAt: '2025-06-07',
    readTime: 9,
    views: 1780,
    likes: 89,
  },
  {
    id: '10',
    slug: 'seo-voi-noi-dung-ai',
    title: 'Tối ưu SEO với nội dung được tạo bởi AI',
    excerpt:
      'Chiến lược SEO hiệu quả khi sử dụng AI để tạo nội dung: cân bằng giữa tự động hóa và chất lượng, tránh penalty từ Google.',
    content: SAMPLE_CONTENT,
    category: 'kinh-doanh',
    tags: ['SEO', 'Content Marketing', 'AI'],
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1432888622747-4eb9ef8b3380?w=1200&h=630&fit=crop',
    author: AUTHORS.admin,
    publishedAt: '2025-06-06',
    readTime: 8,
    views: 2100,
    likes: 112,
  },
  {
    id: '11',
    slug: 'dark-mode-va-accessibility',
    title: 'Dark Mode và Accessibility trong thiết kế web hiện đại',
    excerpt:
      'Best practices thiết kế dark mode thân thiện với người dùng, đảm bảo accessibility WCAG 2.1 và tích hợp seamless với design system.',
    content: SAMPLE_CONTENT,
    category: 'cong-nghe',
    tags: ['Dark Mode', 'Accessibility', 'UI/UX'],
    featured: false,
    coverImage:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=630&fit=crop',
    author: AUTHORS.minh,
    publishedAt: '2025-06-05',
    readTime: 6,
    views: 760,
    likes: 28,
  },
  {
    id: '12',
    slug: 'roadmap-beauty-spa-2025',
    title: 'Roadmap Beauty-Spa H2 2025',
    excerpt:
      'Lộ trình phát triển sản phẩm nửa cuối năm 2025: Image Generator, Video AI, API marketplace và tích hợp enterprise SSO.',
    content: SAMPLE_CONTENT,
    category: 'cap-nhat-san-pham',
    tags: ['Roadmap', 'Product', '2025'],
    featured: true,
    coverImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
    author: AUTHORS.ha,
    publishedAt: '2025-06-04',
    readTime: 4,
    views: 3200,
    likes: 201,
  },
];

export const blogComments: BlogComment[] = [
  {
    id: 'c1',
    postId: '1',
    author: { name: 'Nguyễn Lan', avatar: 'https://avatars.githubusercontent.com/u/5?v=4' },
    content: 'Bài viết rất hữu ích, cảm ơn admin! Tôi đã áp dụng ngay và thấy hiệu quả rõ rệt.',
    createdAt: '2025-06-16T10:30:00',
    likes: 12,
    replies: [
      {
        id: 'c1-r1',
        postId: '1',
        author: { name: 'Admin Beauty-Spa', avatar: AUTHORS.admin.avatar },
        content: 'Cảm ơn bạn! Rất vui khi bài viết hữu ích với bạn. Chúc bạn thành công!',
        createdAt: '2025-06-16T11:00:00',
        likes: 5,
      },
    ],
  },
  {
    id: 'c2',
    postId: '1',
    author: { name: 'Trần Minh', avatar: 'https://avatars.githubusercontent.com/u/6?v=4' },
    content: 'Có thể thêm phần hướng dẫn tích hợp API không? Tôi đang cần cho dự án của mình.',
    createdAt: '2025-06-16T14:20:00',
    likes: 8,
    isOwner: true,
  },
  {
    id: 'c3',
    postId: '1',
    author: { name: 'Lê An', avatar: 'https://avatars.githubusercontent.com/u/7?v=4' },
    content: 'Prompt engineering phần này rất chi tiết. Bookmark ngay!',
    createdAt: '2025-06-15T09:15:00',
    likes: 3,
  },
];

export const POPULAR_TAGS = [
  'AI',
  'Next.js',
  'Marketing',
  'Prompt Engineering',
  'SEO',
  'Chatbot',
  'Product Update',
  'Security',
  'Content',
  'Tutorial',
];

// ======================
// Careers Mock Data
// ======================

const COMPANY_LOGO = '/images/black.png';

const BASE_HIRING_PROCESS = [
  {
    step: 1,
    title: 'Nộp hồ sơ',
    description: 'Ứng viên điền form ứng tuyển và đính kèm CV online.',
  },
  {
    step: 2,
    title: 'Sàng lọc hồ sơ',
    description: 'Đội ngũ HR xem xét hồ sơ trong vòng 3-5 ngày làm việc.',
  },
  {
    step: 3,
    title: 'Phỏng vấn vòng 1',
    description: 'Phỏng vấn trực tuyến với HR và quản lý trực tiếp.',
  },
  {
    step: 4,
    title: 'Phỏng vấn chuyên môn',
    description: 'Bài test kỹ năng hoặc phỏng vấn chuyên sâu với team.',
  },
  {
    step: 5,
    title: 'Offer & Onboarding',
    description: 'Thông báo kết quả và hỗ trợ onboarding cho ứng viên trúng tuyển.',
  },
];

export const jobPosts: JobPost[] = [
  {
    id: 'job-1',
    slug: 'senior-frontend-developer',
    title: 'Senior Frontend Developer (React/Next.js)',
    excerpt:
      'Tham gia phát triển nền tảng AI SaaS với stack hiện đại, làm việc cùng đội ngũ kỹ sư tài năng tại TP.HCM.',
    department: 'engineering',
    location: 'TP. Hồ Chí Minh',
    jobType: 'full-time',
    level: 'senior',
    salaryMin: 35000000,
    salaryMax: 55000000,
    salaryCurrency: 'VND',
    experience: '3-5 năm',
    headcount: 2,
    publishedAt: '2025-06-01T08:00:00Z',
    deadline: '2025-07-15T23:59:59Z',
    views: 2840,
    likes: 156,
    featured: true,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=500&fit=crop',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    description:
      'Chúng tôi đang tìm kiếm Senior Frontend Developer có kinh nghiệm để tham gia xây dựng giao diện người dùng cho nền tảng AI SaaS. Bạn sẽ làm việc trực tiếp với team Product và Design để tạo ra trải nghiệm người dùng xuất sắc.',
    responsibilities: [
      'Phát triển và duy trì các tính năng frontend với React/Next.js',
      'Tối ưu hiệu năng, SEO và Core Web Vitals',
      'Review code và mentor các developer junior',
      'Phối hợp với team Design để implement UI/UX',
      'Tham gia thiết kế kiến trúc frontend và chọn công nghệ',
    ],
    requirements: [
      'Tối thiểu 3 năm kinh nghiệm phát triển frontend',
      'Thành thạo React, Next.js và TypeScript',
      'Kinh nghiệm với Tailwind CSS và responsive design',
      'Hiểu biết về SSR, SSG và SEO optimization',
      'Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả',
    ],
    benefits: [
      'Lương thưởng cạnh tranh + ESOP',
      'Bảo hiểm sức khỏe cao cấp cho bản thân và gia đình',
      'Làm việc linh hoạt 2 ngày/tuần tại văn phòng',
      'Ngân sách học tập 10 triệu/năm',
      'Team building hàng quý',
      'MacBook Pro và thiết bị làm việc cao cấp',
    ],
    salaryDetails:
      'Mức lương từ 35-55 triệu VND/tháng tùy kinh nghiệm. Thưởng performance 2 lần/năm. Review lương 2 lần/năm.',
    workSchedule: 'Thứ 2 - Thứ 6, 9:00 - 18:00 (linh hoạt 1 giờ)',
    workLocation: 'Tầng 12, Tòa nhà Bitexco, Quận 1, TP.HCM',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'AIStarterKit là startup công nghệ AI hàng đầu Việt Nam, cung cấp nền tảng SaaS giúp doanh nghiệp tích hợp AI vào quy trình làm việc. Với hơn 50 nhân viên và 10.000+ khách hàng, chúng tôi đang mở rộng mạnh mẽ.',
  },
  {
    id: 'job-2',
    slug: 'ai-engineer',
    title: 'AI/ML Engineer',
    excerpt:
      'Xây dựng và triển khai các mô hình AI cho sản phẩm chatbot và text generation.',
    department: 'engineering',
    location: 'Hà Nội',
    jobType: 'full-time',
    level: 'mid',
    salaryMin: 30000000,
    salaryMax: 45000000,
    salaryCurrency: 'VND',
    experience: '2-4 năm',
    headcount: 1,
    publishedAt: '2025-06-05T08:00:00Z',
    deadline: '2025-07-20T23:59:59Z',
    views: 1920,
    likes: 98,
    featured: true,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=500&fit=crop',
    skills: ['Python', 'AI/ML', 'PyTorch', 'LangChain', 'Node.js'],
    description:
      'Vị trí AI/ML Engineer yêu cầu bạn thiết kế, huấn luyện và triển khai các mô hình AI cho sản phẩm của chúng tôi, bao gồm chatbot thông minh và công cụ tạo nội dung AI.',
    responsibilities: [
      'Phát triển và fine-tune các mô hình LLM cho use case cụ thể',
      'Xây dựng pipeline xử lý dữ liệu và RAG system',
      'Tối ưu hiệu năng inference và chi phí API',
      'Nghiên cứu và áp dụng các kỹ thuật AI mới nhất',
      'Viết tài liệu kỹ thuật và hướng dẫn sử dụng',
    ],
    requirements: [
      '2+ năm kinh nghiệm với Machine Learning / Deep Learning',
      'Thành thạo Python, PyTorch hoặc TensorFlow',
      'Kinh nghiệm với LLM, prompt engineering, RAG',
      'Hiểu biết về MLOps và model deployment',
      'Tiếng Anh đọc hiểu tài liệu kỹ thuật tốt',
    ],
    benefits: [
      'Lương cạnh tranh + thưởng dự án AI',
      'Làm việc với GPU cluster hiện đại',
      'Tham dự conference AI quốc tế',
      'Remote 3 ngày/tuần',
      'Bảo hiểm full package',
    ],
    salaryDetails: '30-45 triệu VND/tháng. Thưởng theo milestone dự án AI.',
    workSchedule: 'Thứ 2 - Thứ 6, linh hoạt giờ làm việc',
    workLocation: 'Tầng 8, Tòa nhà Keangnam, Cầu Giấy, Hà Nội',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'AIStarterKit đầu tư mạnh vào R&D AI với team 15+ kỹ sư AI. Sản phẩm được sử dụng bởi hàng nghìn doanh nghiệp tại Việt Nam và khu vực.',
  },
  {
    id: 'job-3',
    slug: 'product-manager',
    title: 'Product Manager',
    excerpt:
      'Dẫn dắt chiến lược sản phẩm AI SaaS, làm việc chặt chẽ với Engineering và Design.',
    department: 'product',
    location: 'TP. Hồ Chí Minh',
    jobType: 'full-time',
    level: 'senior',
    salaryMin: 40000000,
    salaryMax: 60000000,
    salaryCurrency: 'VND',
    experience: '4-6 năm',
    headcount: 1,
    publishedAt: '2025-06-08T08:00:00Z',
    deadline: '2025-07-25T23:59:59Z',
    views: 1560,
    likes: 87,
    featured: true,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
    skills: ['Product Management', 'Agile', 'Data Analysis', 'User Research'],
    description:
      'Product Manager sẽ chịu trách nhiệm định hướng roadmap sản phẩm, ưu tiên tính năng và đảm bảo sản phẩm đáp ứng nhu cầu khách hàng doanh nghiệp.',
    responsibilities: [
      'Xây dựng và quản lý product roadmap',
      'Phân tích dữ liệu người dùng và đề xuất cải tiến',
      'Viết PRD, user stories và acceptance criteria',
      'Phối hợp cross-functional với Engineering, Design, Marketing',
      'Theo dõi KPIs và báo cáo tiến độ cho leadership',
    ],
    requirements: [
      '4+ năm kinh nghiệm Product Management trong SaaS/B2B',
      'Kinh nghiệm với sản phẩm AI hoặc công nghệ là lợi thế',
      'Kỹ năng phân tích dữ liệu và ra quyết định dựa trên data',
      'Khả năng giao tiếp và thuyết trình xuất sắc',
      'Tiếng Anh giao tiếp tốt',
    ],
    benefits: [
      'Lương senior PM + ESOP',
      'Quyền quyết định cao về product direction',
      'Ngân sách user research không giới hạn',
      'Hybrid work model',
      'Health insurance premium',
    ],
    salaryDetails: '40-60 triệu VND/tháng. Bonus theo OKR quý.',
    workSchedule: 'Thứ 2 - Thứ 6, 9:00 - 18:00',
    workLocation: 'Tầng 12, Tòa nhà Bitexco, Quận 1, TP.HCM',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'AIStarterKit có product team 8 người, phục vụ 10.000+ khách hàng B2B với NPS 72. Chúng tôi đang scale product lên enterprise tier.',
  },
  {
    id: 'job-4',
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    excerpt:
      'Thiết kế trải nghiệm người dùng cho nền tảng AI, từ wireframe đến high-fidelity prototype.',
    department: 'design',
    location: 'Đà Nẵng',
    jobType: 'full-time',
    level: 'mid',
    salaryMin: 18000000,
    salaryMax: 28000000,
    salaryCurrency: 'VND',
    experience: '2-3 năm',
    headcount: 1,
    publishedAt: '2025-06-10T08:00:00Z',
    deadline: '2025-07-30T23:59:59Z',
    views: 980,
    likes: 64,
    featured: false,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=500&fit=crop',
    skills: ['Figma', 'UI Design', 'UX Research', 'Design System'],
    description:
      'UI/UX Designer sẽ thiết kế giao diện và trải nghiệm người dùng cho các sản phẩm AI của công ty, đảm bảo tính nhất quán và dễ sử dụng.',
    responsibilities: [
      'Thiết kế UI/UX cho web app và mobile responsive',
      'Xây dựng và duy trì Design System',
      'Conduct user research và usability testing',
      'Tạo wireframe, prototype và handoff cho developers',
      'Collaborate với PM và Engineering team',
    ],
    requirements: [
      '2+ năm kinh nghiệm UI/UX design',
      'Portfolio thể hiện quy trình design rõ ràng',
      'Thành thạo Figma và prototyping tools',
      'Hiểu biết về accessibility và responsive design',
      'Kinh nghiệm thiết kế SaaS/dashboard là lợi thế',
    ],
    benefits: [
      'Lương cạnh tranh khu vực Đà Nẵng',
      'Remote full-time',
      'Figma Professional license',
      'Khóa học design online',
      'Flexible working hours',
    ],
    salaryDetails: '18-28 triệu VND/tháng. Review lương 2 lần/năm.',
    workSchedule: 'Linh hoạt, deliverable-based',
    workLocation: 'Remote - Đà Nẵng',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'AIStarterKit có design team distributed, làm việc async với các team tại HCM và Hà Nội.',
  },
  {
    id: 'job-5',
    slug: 'marketing-specialist',
    title: 'Digital Marketing Specialist',
    excerpt:
      'Lên chiến lược và thực thi các chiến dịch marketing digital cho sản phẩm AI SaaS.',
    department: 'marketing',
    location: 'TP. Hồ Chí Minh',
    jobType: 'full-time',
    level: 'mid',
    salaryMin: 15000000,
    salaryMax: 25000000,
    salaryCurrency: 'VND',
    experience: '2-3 năm',
    headcount: 2,
    publishedAt: '2025-06-12T08:00:00Z',
    deadline: '2025-08-01T23:59:59Z',
    views: 720,
    likes: 42,
    featured: false,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=500&fit=crop',
    skills: ['SEO', 'Google Ads', 'Content Marketing', 'Analytics'],
    description:
      'Digital Marketing Specialist chịu trách nhiệm tăng trưởng user acquisition và brand awareness cho nền tảng Beauty-Spa thông qua các kênh digital.',
    responsibilities: [
      'Lập kế hoạch và thực hiện chiến dịch SEO, SEM',
      'Quản lý social media và content calendar',
      'Phân tích metrics và tối ưu conversion funnel',
      'Collaborate với Content team cho blog và case study',
      'A/B testing landing pages và ad creatives',
    ],
    requirements: [
      '2+ năm kinh nghiệm digital marketing B2B/SaaS',
      'Kinh nghiệm với Google Ads, Meta Ads, SEO tools',
      'Khả năng phân tích data với GA4, Mixpanel',
      'Kỹ năng viết content tiếng Việt tốt',
      'Creative mindset và data-driven approach',
    ],
    benefits: [
      'Lương + KPI bonus hấp dẫn',
      'Ngân sách ads để thực hành',
      'Khóa học marketing certification',
      'Team outing hàng tháng',
      'Hybrid work',
    ],
    salaryDetails: '15-25 triệu VND/tháng + bonus KPI 20%/quý.',
    workSchedule: 'Thứ 2 - Thứ 6, 9:00 - 18:00',
    workLocation: 'Tầng 12, Tòa nhà Bitexco, Quận 1, TP.HCM',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'Marketing team 6 người, quản lý ngân sách 500M+/năm cho growth marketing.',
  },
  {
    id: 'job-6',
    slug: 'frontend-intern',
    title: 'Frontend Developer Intern',
    excerpt:
      'Cơ hội thực tập cho sinh viên IT muốn học React/Next.js trong môi trường startup AI.',
    department: 'engineering',
    location: 'TP. Hồ Chí Minh',
    jobType: 'intern',
    level: 'junior',
    salaryMin: 5000000,
    salaryMax: 8000000,
    salaryCurrency: 'VND',
    experience: 'Sinh viên năm 3-4',
    headcount: 3,
    publishedAt: '2025-06-14T08:00:00Z',
    deadline: '2025-08-15T23:59:59Z',
    views: 3200,
    likes: 210,
    featured: true,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=500&fit=crop',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    description:
      'Chương trình thực tập Frontend Developer dành cho sinh viên năm cuối ngành CNTT, cung cấp kinh nghiệm thực tế với dự án production.',
    responsibilities: [
      'Hỗ trợ phát triển UI components với React',
      'Fix bugs và viết unit tests',
      'Tham gia code review và học best practices',
      'Research công nghệ mới và present cho team',
      'Document code và viết technical notes',
    ],
    requirements: [
      'Sinh viên năm 3-4 ngành CNTT hoặc tương đương',
      'Biết HTML, CSS, JavaScript cơ bản',
      'Đã học hoặc tự học React',
      'Có project cá nhân trên GitHub là lợi thế',
      'Tinh thần học hỏi cao, làm việc nhóm tốt',
    ],
    benefits: [
      'Phụ cấp thực tập 5-8 triệu/tháng',
      'Mentor 1-1 từ Senior Developer',
      'Cơ hội full-time sau thực tập',
      'Certificate và recommendation letter',
      'Snacks và team activities',
    ],
    salaryDetails: 'Phụ cấp 5-8 triệu VND/tháng. Thực tập 3-6 tháng.',
    workSchedule: 'Thứ 2 - Thứ 6, 9:00 - 18:00 (tối thiểu 30h/tuần)',
    workLocation: 'Tầng 12, Tòa nhà Bitexco, Quận 1, TP.HCM',
    hiringProcess: BASE_HIRING_PROCESS.slice(0, 4),
    companyInfo:
      'AIStarterKit đã đào tạo 20+ intern, 80% chuyển sang full-time. Môi trường học hỏi nhanh, thực chiến.',
  },
  {
    id: 'job-7',
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    excerpt:
      'Xây dựng và vận hành hạ tầng cloud cho nền tảng AI với AWS/Kubernetes.',
    department: 'engineering',
    location: 'Remote',
    jobType: 'remote',
    level: 'senior',
    salaryMin: 35000000,
    salaryMax: 50000000,
    salaryCurrency: 'VND',
    experience: '3-5 năm',
    headcount: 1,
    publishedAt: '2025-06-15T08:00:00Z',
    deadline: '2025-08-10T23:59:59Z',
    views: 890,
    likes: 53,
    featured: false,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1667372393119-3d21c2d1e8f0?w=1200&h=500&fit=crop',
    skills: ['DevOps', 'AWS', 'Kubernetes', 'Docker', 'CI/CD'],
    description:
      'DevOps Engineer sẽ thiết kế, triển khai và duy trì hạ tầng cloud scalable cho platform AI, đảm bảo uptime 99.9%.',
    responsibilities: [
      'Quản lý infrastructure trên AWS (EKS, RDS, S3)',
      'Xây dựng CI/CD pipelines với GitHub Actions',
      'Monitor và alert với Datadog/Prometheus',
      'Implement security best practices và compliance',
      'Automate deployment và scaling',
    ],
    requirements: [
      '3+ năm kinh nghiệm DevOps/SRE',
      'Thành thạo AWS, Docker, Kubernetes',
      'Kinh nghiệm với Terraform hoặc CloudFormation',
      'Hiểu biết về networking và security',
      'Scripting với Python hoặc Bash',
    ],
    benefits: [
      'Remote 100%, flexible timezone',
      'Lương USD-equivalent competitive',
      'Home office setup budget 15 triệu',
      'Conference và certification budget',
      'Async-first culture',
    ],
    salaryDetails: '35-50 triệu VND/tháng. Thanh toán qua bank transfer.',
    workSchedule: 'Flexible, overlap 4h với team HCM (9-13 ICT)',
    workLocation: 'Remote - Việt Nam',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'Infrastructure team 4 người, xử lý 1M+ API requests/day với latency p99 < 200ms.',
  },
  {
    id: 'job-8',
    slug: 'sales-executive',
    title: 'Sales Executive (B2B SaaS)',
    excerpt:
      'Phát triển khách hàng doanh nghiệp cho giải pháp AI SaaS tại thị trường Việt Nam.',
    department: 'sales',
    location: 'Hà Nội',
    jobType: 'full-time',
    level: 'mid',
    salaryMin: 15000000,
    salaryMax: 20000000,
    salaryCurrency: 'VND',
    experience: '2-3 năm',
    headcount: 2,
    publishedAt: '2025-06-16T08:00:00Z',
    deadline: '2025-08-20T23:59:59Z',
    views: 450,
    likes: 28,
    featured: false,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=500&fit=crop',
    skills: ['B2B Sales', 'CRM', 'Negotiation', 'SaaS'],
    description:
      'Sales Executive chịu trách nhiệm tìm kiếm, nurture và close deals với khách hàng doanh nghiệp sử dụng giải pháp AI của chúng tôi.',
    responsibilities: [
      'Prospect và qualify leads từ marketing',
      'Demo sản phẩm và present value proposition',
      'Negotiate contract và close deals',
      'Maintain CRM pipeline chính xác',
      'Collaborate với CS team cho onboarding',
    ],
    requirements: [
      '2+ năm kinh nghiệm B2B sales, ưu tiên SaaS/Tech',
      'Track record đạt/quá quota',
      'Kỹ năng presentation và negotiation',
      'Sử dụng CRM (HubSpot/Salesforce)',
      'Tiếng Anh giao tiếp cơ bản',
    ],
    benefits: [
      'Lương cứng + commission không giới hạn',
      'OTE 40-60 triệu/tháng cho top performer',
      'Company car allowance',
      'Sales kickoff trip hàng năm',
      'Fast promotion path',
    ],
    salaryDetails: 'Lương cứng 15-20 triệu + commission 10-30% deal value.',
    workSchedule: 'Thứ 2 - Thứ 6, linh hoạt theo lịch khách hàng',
    workLocation: 'Tầng 8, Tòa nhà Keangnam, Cầu Giấy, Hà Nội',
    hiringProcess: BASE_HIRING_PROCESS,
    companyInfo:
      'Sales team 10 AE, average deal size 50M VND, sales cycle 30-60 ngày.',
  },
  {
    id: 'job-9',
    slug: 'hr-specialist',
    title: 'HR Specialist',
    excerpt:
      'Hỗ trợ tuyển dụng, onboarding và phát triển văn hóa doanh nghiệp tại startup AI.',
    department: 'hr',
    location: 'TP. Hồ Chí Minh',
    jobType: 'part-time',
    level: 'mid',
    salaryMin: 10000000,
    salaryMax: 15000000,
    salaryCurrency: 'VND',
    experience: '2-3 năm',
    headcount: 1,
    publishedAt: '2025-06-17T08:00:00Z',
    deadline: '2025-08-25T23:59:59Z',
    views: 380,
    likes: 19,
    featured: false,
    companyLogo: COMPANY_LOGO,
    coverImage:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=500&fit=crop',
    skills: ['Recruitment', 'HR Management', 'Employer Branding'],
    description:
      'HR Specialist hỗ trợ toàn bộ quy trình nhân sự từ tuyển dụng, onboarding đến employee engagement trong giai đoạn scale-up.',
    responsibilities: [
      'Quản lý full-cycle recruitment',
      'Onboarding và offboarding nhân viên mới',
      'Xây dựng employer branding trên các kênh',
      'Hỗ trợ payroll và benefits administration',
      'Organize team events và employee engagement activities',
    ],
    requirements: [
      '2+ năm kinh nghiệm HR, ưu tiên tech startup',
      'Kinh nghiệm tuyển dụng IT/Tech roles',
      'Kỹ năng giao tiếp và organization',
      'Sử dụng ATS và HR tools',
      'Passion về văn hóa startup',
    ],
    benefits: [
      'Part-time linh hoạt 20-30h/tuần',
      'Remote 2 ngày/tuần',
      'Cơ hội chuyển full-time',
      'Làm việc với leadership trực tiếp',
      'HR certification support',
    ],
    salaryDetails: '10-15 triệu VND/tháng (part-time). Pro-rate theo giờ.',
    workSchedule: 'Thứ 2 - Thứ 6, 4-6h/ngày linh hoạt',
    workLocation: 'Tầng 12, Tòa nhà Bitexco, Quận 1, TP.HCM',
    hiringProcess: BASE_HIRING_PROCESS.slice(0, 3),
    companyInfo:
      'Team 50 người, đang tuyển thêm 20 headcount trong 2025. Culture: transparent, growth-minded.',
  },
];

export const jobComments: JobComment[] = [
  {
    id: 'jc-1',
    jobId: 'job-1',
    author: {
      name: 'Nguyễn Văn A',
      avatar: 'https://avatars.githubusercontent.com/u/5?v=4',
    },
    content:
      'Vị trí này có yêu cầu remote không ạ? Mình đang ở Đà Nẵng nhưng có thể relocate.',
    createdAt: '2025-06-10T10:30:00Z',
    likes: 5,
    replies: [
      {
        id: 'jc-1-r1',
        jobId: 'job-1',
        author: {
          name: 'HR Beauty-Spa',
          avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
        },
        content:
          'Chào bạn! Vị trí này hybrid 2 ngày/tuần tại văn phòng HCM. Remote full chỉ áp dụng cho vị trí DevOps và Design.',
        createdAt: '2025-06-10T14:00:00Z',
        likes: 3,
      },
    ],
  },
  {
    id: 'jc-2',
    jobId: 'job-1',
    author: {
      name: 'Trần Thị B',
      avatar: 'https://avatars.githubusercontent.com/u/6?v=4',
    },
    content:
      'Mình đã ứng tuyển tuần trước, chưa nhận được phản hồi. Thường mất bao lâu để HR liên hệ?',
    createdAt: '2025-06-12T09:15:00Z',
    likes: 2,
    isOwner: true,
  },
  {
    id: 'jc-3',
    jobId: 'job-6',
    author: {
      name: 'Lê Minh C',
      avatar: 'https://avatars.githubusercontent.com/u/7?v=4',
    },
    content:
      'Sinh viên năm 2 có được apply thực tập không ạ? Mình đã có project React trên GitHub.',
    createdAt: '2025-06-15T16:45:00Z',
    likes: 8,
  },
];

