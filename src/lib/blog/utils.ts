import { blogPosts } from './data';
import type { BlogCategoryFilter, BlogPost, TocItem } from './types';
import { BLOG_CATEGORIES } from './types';

export const POSTS_PER_PAGE = 6;

export function getPublishedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 5): BlogPost[] {
  return getPublishedPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getMostViewedPosts(limit = 5): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getLatestPosts(excludeSlug?: string, limit = 4): BlogPost[] {
  return getPublishedPosts()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 4): BlogPost[] {
  const scored = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 3;
      const sharedTags = p.tags.filter((t) => post.tags.includes(t));
      score += sharedTags.length * 2;
      return { post: p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length >= limit) {
    return scored.slice(0, limit).map(({ post }) => post);
  }

  const related = scored.map(({ post }) => post);
  const remaining = getPublishedPosts()
    .filter((p) => p.slug !== post.slug && !related.find((r) => r.slug === p.slug))
    .slice(0, limit - related.length);

  return [...related, ...remaining];
}

export function filterPosts(
  posts: BlogPost[],
  filter: BlogCategoryFilter,
  search: string
): BlogPost[] {
  let result = posts;

  if (filter === 'featured') {
    result = result.filter((post) => post.featured);
  } else if (filter !== 'all') {
    result = result.filter((post) => post.category === filter);
  }

  if (search.trim()) {
    const query = search.toLowerCase().trim();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return result;
}

export function paginatePosts<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}

export function getCategoryLabel(category: BlogPost['category']): string {
  return BLOG_CATEGORIES[category]?.label ?? category;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return formatDate(dateStr);
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export function extractTocFromContent(content: string): TocItem[] {
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    items.push({
      level: Number(match[1]) as 2 | 3,
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ''),
    });
  }

  return items;
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: blogPosts.length, featured: 0 };
  blogPosts.forEach((post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    if (post.featured) counts.featured += 1;
  });
  return counts;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aistarterkit.demo';
}
