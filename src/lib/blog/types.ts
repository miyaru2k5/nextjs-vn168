export type BlogCategory =
  | 'cong-nghe'
  | 'ai'
  | 'huong-dan'
  | 'kinh-doanh'
  | 'cap-nhat-san-pham';

export type BlogCategoryFilter = BlogCategory | 'featured' | 'all';

export type BlogAuthor = {
  name: string;
  avatar: string;
  role: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  coverImage: string;
  author: BlogAuthor;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
};

export type BlogComment = {
  id: string;
  postId: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isOwner?: boolean;
  replies?: BlogComment[];
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export const BLOG_CATEGORIES: Record<
  BlogCategory,
  { label: string; slug: BlogCategory }
> = {
  'cong-nghe': { label: 'Công nghệ', slug: 'cong-nghe' },
  ai: { label: 'AI', slug: 'ai' },
  'huong-dan': { label: 'Hướng dẫn', slug: 'huong-dan' },
  'kinh-doanh': { label: 'Kinh doanh', slug: 'kinh-doanh' },
  'cap-nhat-san-pham': { label: 'Cập nhật sản phẩm', slug: 'cap-nhat-san-pham' },
};

export const BLOG_FILTERS: { value: BlogCategoryFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'featured', label: 'Tin nổi bật' },
  { value: 'cong-nghe', label: 'Công nghệ' },
  { value: 'ai', label: 'AI' },
  { value: 'huong-dan', label: 'Hướng dẫn' },
  { value: 'kinh-doanh', label: 'Kinh doanh' },
  { value: 'cap-nhat-san-pham', label: 'Cập nhật sản phẩm' },
];
