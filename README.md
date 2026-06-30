# VN168 – AI Website & SaaS Starter Kit (Next.js)

VN168 là template website hiện đại được xây dựng bằng **Next.js**, dành cho các nền tảng SaaS, ứng dụng AI, landing page sản phẩm và dashboard quản trị.

---

## 🚀 Demo

👉 [Live Preview](https://nextjs-vn168.vercel.app/)

---

## ⚙️ Công nghệ sử dụng

- Next.js (App Router / Pages Router)
- React
- TypeScript
- Tailwind CSS
- Responsive Design (Desktop / Tablet / Mobile)
- SEO Friendly Structure
- Component-based Architecture
- Drizzle 
- PostgreSQL

---

## 📁 Bắt đầu

```bash
git clone https://github.com/miyaru2k5/nextjs-vn168.git
cd nextjs-vn168
npm install
npm run dev
```

---

### Thiết lập Database (PostgreSQL + Drizzle)

```bash
cp .env.example .env          # Cấu hình DATABASE_URL
npm run db:generate && npm run db:push
npm run db:seed               # Seed dữ liệu mẫu tiếng Việt (idempotent)
```

> **Lưu ý:** `npm run dev` tự động seed database nếu trống. Dữ liệu tiếng Việt thực tế với ảnh picsum ổn định.

---

## 🌱 Data Seeder

Seeder tạo dữ liệu mẫu bao gồm:
- Tên người Việt, danh mục, bài viết, bình luận, đơn hàng, jobs
- Giá VND, trạng thái đa dạng, ảnh ổn định
- Idempotent với seed cố định để đảm bảo tái lập

```bash
npm run db:seed                           # Seed database
SEED_TO_JSON=true npm run db:seed         # Xuất ra JSON (seed-data/)
```

Reset database: `npm run db:push -- --force && npm run db:seed`

---

## Môi trường

Seeding chỉ giới hạn ở môi trường `development` với các guard tích hợp sẵn.
