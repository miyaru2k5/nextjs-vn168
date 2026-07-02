# Beauty-Spa

Nền tảng **spa & mỹ phẩm cao cấp** xây dựng bằng Next.js — bao gồm website giới thiệu dịch vụ, blog, tuyển dụng, tư vấn AI và dashboard quản trị đầy đủ. Dự án được Việt hóa và tích hợp sẵn hệ thống dữ liệu linh hoạt (JSON / PostgreSQL / mock).

**Demo:** [https://nextjs-vn168.vercel.app/](https://nextjs-vn168.vercel.app/)

---

## Tính năng

### Website công khai
- **Trang chủ** — Hero, tính năng cốt lõi, công cụ AI, lợi ích, testimonial, bảng giá, FAQ
- **Tin tức** (`/tin-tuc`) — Danh sách bài viết, chi tiết bài, SEO schema, bình luận
- **Tuyển dụng** (`/tuyen-dung`) — Danh sách vị trí, chi tiết job, form ứng tuyển
- **AI Text Generator** (`/text-generator`) — Chat streaming với OpenAI qua Vercel AI SDK
- **Xác thực** — Đăng nhập, đăng ký, quên/đặt lại mật khẩu (NextAuth v5)
- **Thanh toán** — Tích hợp Stripe (gói Plus / Pro)
- **Dark mode** — Hỗ trợ giao diện sáng/tối

### Admin Dashboard (`/admin`)
- Tổng quan, biểu đồ doanh thu & người dùng
- Quản lý người dùng, vai trò, phân quyền
- Quản lý bài viết, danh mục, bình luận, banner
- Quản lý AI tools, lịch sử, API keys, thống kê token
- Quản lý đơn hàng, thanh toán, gói dịch vụ, hóa đơn
- Khách hàng, liên hệ, hỗ trợ
- Báo cáo doanh thu, người dùng, lượt truy cập, hiệu suất
- Cài đặt website, SEO, email, thông báo, bảo mật

### Hệ thống dữ liệu
- **4 chế độ nguồn dữ liệu:** `auto` | `json` | `db` | `mock`
- **Seeder tiếng Việt** — Tên, nội dung, giá VND, ảnh ổn định, idempotent
- **Tự seed khi dev** — `npm run dev` tự đảm bảo dữ liệu mẫu sẵn sàng
- **Xuất JSON** — Dùng được ngay cả khi chưa có PostgreSQL

---

## Công nghệ

| Thành phần | Phiên bản / Công nghệ |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, Radix UI |
| Ngôn ngữ | TypeScript 5 |
| Database | PostgreSQL + Drizzle ORM |
| AI | Vercel AI SDK, OpenAI |
| Auth | NextAuth v5 (beta) |
| Thanh toán | Stripe |
| Biểu đồ | Recharts |
| Validation | Zod, React Hook Form |

---

## Yêu cầu hệ thống

- Node.js 20+
- pnpm 11+ (khuyến nghị) hoặc npm
- PostgreSQL 14+ (tùy chọn — có thể chạy chỉ với JSON/mock)

---

## Bắt đầu nhanh

### 1. Clone & cài đặt

```bash
git clone https://github.com/miyaru2k5/nextjs-vn168.git beauty-spa
cd beauty-spa
pnpm install   # hoặc: npm install
```

### 2. Cấu hình môi trường

```bash
cp .env.example .env.local
```

Chỉnh sửa các biến cần thiết trong `.env.local`:

```env
# Bắt buộc cho AI Text Generator
OPENAI_API_KEY="sk-..."

# Bắt buộc cho xác thực
AUTH_SECRET="your-random-secret"
AUTH_URL="http://localhost:3000"

# Tùy chọn — PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/beauty_spa?schema=public"

# Chế độ dữ liệu (development)
DATA_SOURCE=auto
SEED_TO_JSON=true
```

### 3. Chạy development

```bash
pnpm dev   # hoặc: npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

> `npm run dev` tự động chạy `ensure-dev-seed` — tạo file JSON trong `seed-data/` nếu chưa có, hoặc seed database nếu `DATABASE_URL` được cấu hình.

---

## Thiết lập Database (PostgreSQL + Drizzle)

```bash
# Tạo schema
pnpm db:generate
pnpm db:push

# Seed dữ liệu mẫu tiếng Việt
pnpm db:seed
```

### Lệnh database hữu ích

| Lệnh | Mô tả |
|---|---|
| `pnpm db:generate` | Sinh migration từ schema |
| `pnpm db:push` | Đồng bộ schema lên database |
| `pnpm db:migrate` | Chạy migration |
| `pnpm db:seed` | Seed dữ liệu mẫu (idempotent) |
| `pnpm db:studio` | Mở Drizzle Studio |
| `pnpm seed:ensure` | Đảm bảo seed data sẵn sàng (dev) |

Reset database và seed lại:

```bash
pnpm db:push -- --force && pnpm db:seed
```

---

## Data Seeder

Seeder tạo dữ liệu mẫu bao gồm:

- Người dùng, vai trò, danh mục, bài viết, bình luận
- Đơn hàng, hóa đơn, banner, jobs tuyển dụng
- Báo cáo dashboard, thông báo, tin nhắn
- Tên người Việt, giá VND, ảnh picsum ổn định
- Seed cố định để tái lập kết quả

```bash
npm run db:seed                           # Seed database
```

Reset database: `npm run db:push -- --force && npm run db:seed`

---

## Cấu trúc thư mục

```
beauty-spa/
├── drizzle/                  # Migration files
├── public/                   # Static assets & seed-data JSON (sau khi seed)
├── scripts/
│   ├── ensure-dev-seed.ts    # Auto-seed khi dev
│   └── seed.ts               # Seeder chính
├── src/
│   ├── app/
│   │   ├── (site)/           # Trang công khai (blog, tuyển dụng, auth...)
│   │   ├── (generator)/      # AI Text Generator
│   │   ├── admin/            # Admin dashboard
│   │   └── api/              # API routes (chat, admin data...)
│   ├── components/           # UI components
│   ├── db/                   # Drizzle schema & client
│   └── lib/
│       ├── admin/            # Admin hooks, queries, navigation
│       ├── ai/               # AI model & prompts
│       └── seed/             # Data loader, mock, generators
├── .env.example
├── drizzle.config.ts
└── next.config.ts
```

---

## Scripts

| Script | Mô tả |
|---|---|
| `pnpm dev` | Chạy dev server (tự seed nếu cần) |
| `pnpm build` | Build production |
| `pnpm start` | Chạy production server |
| `pnpm lint` | ESLint |
| `pnpm stripe:listen` | Forward Stripe webhooks về localhost |

---

## Triển khai (Vercel)

1. Push code lên GitHub
2. Import project trên [Vercel](https://vercel.com)
3. Thiết lập biến môi trường:
   - `DATABASE_URL`
   - `DATA_SOURCE=db`
   - `OPENAI_API_KEY`
   - `AUTH_SECRET`, `AUTH_URL`
   - Các biến Stripe (nếu dùng thanh toán)
4. Deploy

---

## Giấy phép

Dự án được phát hành theo giấy phép [MIT](LICENSE).