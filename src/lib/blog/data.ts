import type { BlogComment, BlogPost } from './types';

const AUTHORS = {
  admin: {
    name: 'Admin AIStarterKit',
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
<tr><td>AIStarterKit</td><td>Tự host, tùy biến cao</td><td>Startup, SaaS</td></tr>
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
    title: 'So sánh các gói dịch vụ AI Starter Kit',
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
    slug: 'roadmap-ai-starter-kit-2025',
    title: 'Roadmap AI Starter Kit H2 2025',
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
        author: { name: 'Admin AIStarterKit', avatar: AUTHORS.admin.avatar },
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
