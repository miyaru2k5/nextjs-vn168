/**
 * Vietnamese localized data pools + generators
 * CENTRALIZED in src/lib/seed/generators.ts (one of the specific main files)
 * 
 * All seed/mock/test data generation logic is concentrated here.
 * 
 * IMPORTANT: This is auxiliary logic for sample data only.
 * Types are from existing admin types. Seed is not a centralized domain module.
 * Production code should not depend on seed.
 */

import { faker } from '@faker-js/faker/locale/vi';

export const VN_SURNAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ',
  'Ngô', 'Dương', 'Lý', 'Phan', 'Trịnh', 'Đinh', 'Lâm', 'Phùng', 'Mai', 'Võ',
];

export const VN_MIDDLE_NAMES = ['Văn', 'Thị', 'Hoàng', 'Quốc', 'Minh', 'Thanh', 'Hữu', 'Đức', 'Ngọc', 'Anh'];

export const VN_FIRST_NAMES_MALE = [
  'Minh', 'Anh', 'Tuấn', 'Hùng', 'Dũng', 'Khoa', 'Quân', 'Long', 'Thắng', 'Huy',
  'Đức', 'Phúc', 'Thành', 'Bình', 'Tùng', 'Hải', 'Sơn', 'Việt', 'Toàn', 'Khôi',
];

export const VN_FIRST_NAMES_FEMALE = [
  'Lan', 'Hương', 'Hà', 'Mai', 'Linh', 'Trang', 'Thảo', 'Hằng', 'Ngọc', 'Yến',
  'Phương', 'Nhung', 'Dung', 'Oanh', 'Hiền', 'Thu', 'Hạnh', 'Quỳnh', 'Nga', 'Tâm',
];

export const ARTICLE_CATEGORIES = [
  { name: 'Hướng dẫn', slug: 'huong-dan' },
  { name: 'AI', slug: 'ai' },
  { name: 'Công nghệ', slug: 'cong-nghe' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'SEO', slug: 'seo' },
  { name: 'Content', slug: 'content' },
  { name: 'Tin tức', slug: 'tin-tuc' },
  { name: 'Cập nhật sản phẩm', slug: 'cap-nhat-san-pham' },
  { name: 'Kinh doanh', slug: 'kinh-doanh' },
];

export const ARTICLE_TITLES = [
  'Hướng dẫn sử dụng AI Text Generator hiệu quả',
  '10 mẹo viết content với AI nhanh và chất lượng cao',
  'Cách tích hợp OpenAI vào Next.js App Router',
  'Bảo mật dữ liệu người dùng khi dùng AI',
  'So sánh các mô hình AI năm 2026',
  'Xây dựng chatbot hỗ trợ khách hàng bằng AI',
  'Tối ưu prompt engineering cho người Việt',
  'Xu hướng AI Agent và ứng dụng thực tế',
  'Cập nhật tính năng mới trên Beauty-Spa',
  'Hướng dẫn tạo hình ảnh với AI cho marketer',
  'AI trong SEO: Tương lai của tìm kiếm',
  'Quản lý token và chi phí khi dùng LLM',
  'Best practices cho SaaS tích hợp AI',
  'Từ ý tưởng đến sản phẩm AI trong 30 ngày',
  'Phân tích case study: Tăng 4x conversion với AI',
];

export const ARTICLE_EXCERPTS = [
  'Khám phá cách tận dụng AI để tăng năng suất viết lách và sáng tạo nội dung một cách chuyên nghiệp.',
  'Các chiến lược thực tế giúp bạn sử dụng AI hiệu quả hơn trong công việc hàng ngày.',
  'Hướng dẫn chi tiết từng bước để tích hợp mô hình AI vào ứng dụng web hiện đại.',
  'Làm thế nào để giữ an toàn dữ liệu cá nhân khi triển khai công cụ AI.',
];

export const JOB_TITLES = [
  'Senior Frontend Developer (React/Next.js)',
  'Backend Engineer - AI Platform',
  'Product Designer (AI Products)',
  'AI/ML Engineer',
  'Fullstack Developer (TypeScript + AI)',
  'Marketing Manager - Growth',
  'Content Strategist & AI Writer',
  'DevOps Engineer (Cloud & AI infra)',
  'Customer Success Specialist',
  'Data Analyst - Growth & Revenue',
];

export const JOB_DEPARTMENTS: Array<'engineering' | 'product' | 'marketing' | 'design' | 'hr' | 'sales'> = [
  'engineering', 'product', 'marketing', 'design', 'hr', 'sales',
];

export const PACKAGES = [
  { name: 'Starter', price: 199000 },
  { name: 'Pro', price: 499000 },
  { name: 'Enterprise', price: 999000 },
];

export const ORDER_STATUSES = ['completed', 'pending', 'cancelled', 'refunded'] as const;
export const USER_STATUSES = ['active', 'inactive', 'locked'] as const;
export const ARTICLE_STATUSES = ['published', 'draft', 'scheduled'] as const;

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateVietnameseName(gender?: 'male' | 'female'): string {
  const surname = pickRandom(VN_SURNAMES);
  const middle = pickRandom(VN_MIDDLE_NAMES);
  const firstPool = gender === 'male' ? VN_FIRST_NAMES_MALE : gender === 'female' ? VN_FIRST_NAMES_FEMALE : [...VN_FIRST_NAMES_MALE, ...VN_FIRST_NAMES_FEMALE];
  const first = pickRandom(firstPool);
  return `${surname} ${middle} ${first}`;
}

export function generateEmail(name: string): string {
  const slug = name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '.');
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com.vn', 'example.com'];
  return `${slug}@${pickRandom(domains)}`;
}

export function generatePhone(): string {
  return '0' + (Math.floor(Math.random() * 900000000) + 100000000);
}

/**
 * Return a stable image URL. Uses picsum with seed for reproducibility.
 */
export function generateImageUrl(seed: string, w = 800, h = 600): string {
  const safeSeed = seed.replace(/\s+/g, '-').toLowerCase().slice(0, 40);
  return `https://picsum.photos/seed/${safeSeed}/${w}/${h}`;
}

/**
 * Realistic VND price for orders (within range of packages + variation)
 */
export function generateOrderAmount(base: number): number {
  const variation = Math.floor(Math.random() * 50000) - 25000;
  return Math.max(99000, base + variation);
}

// ======================
// New helpers for Reports / Payments / AI Tools
// ======================

export const AI_TOOLS_LIST = [
  { name: 'Text Generator', type: 'Chat' },
  { name: 'Image Generator', type: 'Image' },
  { name: 'Code Assistant', type: 'Code' },
  { name: 'Email Writer', type: 'Text' },
];

export const PAYMENT_METHODS = ['Stripe', 'MoMo', 'Bank Transfer', 'VNPay'];

export function generateInvoiceAmount(): number {
  const bases = [199000, 499000, 999000];
  return pickRandom(bases) + (Math.random() > 0.7 ? 50000 : 0);
}

export function generateApiKeyName(): string {
  return pickRandom(['Production', 'Development', 'Staging', 'Test', 'Internal']) + ' Key';
}

export function generateDuration(): string {
  const secs = (Math.random() * 10 + 0.8).toFixed(1);
  return `${secs}s`;
}

// Report generators (for seed data)
export function generateRevenueReport() {
  return {
    monthlyRevenue: faker.number.int({ min: 35000000, max: 65000000 }),
    yearlyRevenue: faker.number.int({ min: 180000000, max: 320000000 }),
    arpu: faker.number.int({ min: 150000, max: 250000 }),
    refundRate: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
    changeMonthly: parseFloat((Math.random() * 25 + 5).toFixed(1)),
    changeYearly: parseFloat((Math.random() * 30 + 10).toFixed(1)),
  };
}

export function generatePerformanceReport() {
  return {
    uptime: parseFloat((99.5 + Math.random() * 0.48).toFixed(2)),
    responseTime: faker.number.int({ min: 80, max: 180 }),
    errorRate: parseFloat((Math.random() * 0.3 + 0.05).toFixed(2)),
    apiCallsPerHour: faker.number.int({ min: 8000, max: 18000 }),
    changeUptime: parseFloat((Math.random() * 0.1).toFixed(2)),
    changeResponseTime: parseFloat((-10 + Math.random() * 5).toFixed(1)),
    changeErrorRate: parseFloat((-0.1 + Math.random() * 0.08).toFixed(2)),
    changeApiCalls: parseFloat((Math.random() * 20 + 5).toFixed(1)),
  };
}

export function generateTrafficReport() {
  return {
    visits: faker.number.int({ min: 65000, max: 130000 }),
    pageviews: faker.number.int({ min: 180000, max: 350000 }),
    bounceRate: parseFloat((25 + Math.random() * 15).toFixed(1)),
    avgTimeOnSite: faker.number.int({ min: 150, max: 280 }),
    changeVisits: parseFloat((Math.random() * 30 + 5).toFixed(1)),
    changePageviews: parseFloat((Math.random() * 25 + 5).toFixed(1)),
    changeBounce: parseFloat((-8 + Math.random() * 5).toFixed(1)),
    changeAvgTime: parseFloat((Math.random() * 15 - 2).toFixed(1)),
  };
}

export function generateUsersReport() {
  return {
    totalUsers: faker.number.int({ min: 9000, max: 18000 }),
    dau: faker.number.int({ min: 2000, max: 5000 }),
    mau: faker.number.int({ min: 7000, max: 14000 }),
    retentionRate: parseFloat((70 + Math.random() * 15).toFixed(1)),
    changeTotal: parseFloat((Math.random() * 20 + 5).toFixed(1)),
    changeDau: parseFloat((Math.random() * 15 + 3).toFixed(1)),
    changeMau: parseFloat((Math.random() * 18 + 4).toFixed(1)),
    changeRetention: parseFloat((Math.random() * 5 + 0.5).toFixed(1)),
  };
}
