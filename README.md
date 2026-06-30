# VN168 – AI Website & SaaS Starter Kit (Next.js)

VN168 là một bộ template website hiện đại được xây dựng bằng **Next.js**, phù hợp cho các hệ thống SaaS, nền tảng AI, landing page sản phẩm và dashboard quản trị.

---

## 🚀 Demo

👉 Live Preview:  
https://nextjs-vn168.vercel.app/

---

## ⚙️ Công nghệ sử dụng

- Next.js (App Router / Pages Router)
- React
- TypeScript
- Tailwind CSS
- Responsive Design (Desktop / Tablet / Mobile)
- SEO Friendly Structure
- Component-based Architecture

---

## 📁 Cài đặt & chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/miyaru2k5/nextjs-vn168.git
cd aistarterkit-1.0.0
npm install
npm run dev
http://localhost:3000

---

### 2. Thiết lập Database (Drizzle + PostgreSQL)

```bash
# 1. Copy env
cp .env.example .env

# 2. Điền DATABASE_URL (PostgreSQL)

# 3. Generate & push schema
npm run db:generate
npm run db:push

# 4. Seed dữ liệu mẫu Việt Nam (rất khuyến khích cho dev)
npm run db:seed
```

**Lưu ý seed:**
- Script **idempotent** (chạy nhiều lần an toàn).
- Sử dụng dữ liệu tiếng Việt thực tế (tên, tiêu đề, giá VND).
- Dùng @faker-js/faker + curated pools (tương tự RandomData_DB).
- Ảnh sử dụng picsum.photos với seed ổn định.

Để reset DB và seed lại:
```bash
npm run db:push -- --force   # cẩn thận
npm run db:seed
```

## 🌱 Random Data Seeder (VN Data)

Script chuyên dụng tạo dữ liệu mẫu:

- Tên người Việt chuẩn (Nguyễn Thị Lan, Trần Văn Minh...)
- Danh mục bài viết thực tế + phân cấp
- Bài viết, bình luận, đơn hàng, banner, jobs
- Giá VND, trạng thái đa dạng, ảnh ổn định (picsum)
- **Idempotent** + seed cố định để reproducible

```bash
npm run db:seed
```

### Tích hợp với `npm run dev`

Bây giờ `npm run dev` sẽ **tự động xử lý seed**:

```bash
npm run dev
```

Hành vi:
- Chạy `seed:ensure` trước khi start Next.js
- Nếu `DATA_SOURCE=json` hoặc `auto` và chưa có file JSON → tự động tạo
- Nếu `DATA_SOURCE=db` → đảm bảo dữ liệu trong PostgreSQL (idempotent)
- Có thể gọi thủ công: `npm run seed:ensure`

Ngoài ra, app còn có **runtime ensure** ở root layout (chỉ dev) để seed ngay cả khi start Next trực tiếp.

### Tạo file JSON (mới)

Thêm thông số môi trường để khi chạy ở local sẽ xuất dữ liệu ra file JSON:

```env
SEED_TO_JSON=true
```

- Khi `SEED_TO_JSON=true` (hoặc chạy ở `development` và không tắt), script sẽ tạo thư mục `seed-data/` với:
  - `categories.json`, `users.json`, `articles.json`, `comments.json`, `orders.json`, `banners.json`, `jobs.json`
  - `seed-manifest.json`

Điều này rất hữu ích khi:
- Chưa setup database
- Muốn dùng dữ liệu thật cho mock / fixtures / test
- Muốn có dữ liệu Việt Nam ổn định để commit hoặc dùng ở frontend

Ví dụ chỉ muốn JSON (không chạm DB):
```bash
SEED_TO_DB=false SEED_TO_JSON=true npm run db:seed
```

Xem chi tiết trong:
- `scripts/seed.ts`
- `src/lib/seed/vn-data.ts` (custom data pools)

### Checklist verify sau seed (theo skill random-data-seeder)

- [ ] `npm run db:seed` chạy không lỗi
- [ ] Chạy lần 2 không tạo duplicate / không lỗi
- [ ] Truy vấn DB: categories, users, articles, orders có dữ liệu
- [ ] Ảnh load được (picsum)
- [ ] Tên, mô tả mang tính Việt Nam
- [ ] Quan hệ đúng thứ tự (category trước article)

## Môi trường

Chỉ seed ở môi trường development. Script có guard cơ bản.

```ts
// Ví dụ tương lai (khi migrate khỏi mock):
if (process.env.NODE_ENV === 'development') {
  // await ensureSeedIfEmpty();
}
```

