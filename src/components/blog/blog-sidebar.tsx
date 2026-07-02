import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import { BLOG_CATEGORIES } from '@/lib/blog/types';
import { formatViews, getCategoryLabel } from '@/lib/blog/utils';
import { POPULAR_TAGS } from '@/lib/seed/mock-data';
import { BlogCard } from './blog-card';

type Props = {
  featuredPosts: BlogPost[];
  mostViewedPosts: BlogPost[];
  categoryCounts: Record<string, number>;
};

export function BlogSidebar({ featuredPosts, mostViewedPosts, categoryCounts }: Props) {
  return (
    <aside className="space-y-6">
      <Widget title="Bài viết nổi bật">
        <div className="space-y-4">
          {featuredPosts.slice(0, 4).map((post) => (
            <BlogCard key={post.id} post={post} variant="horizontal" />
          ))}
        </div>
      </Widget>

      <Widget title="Danh mục">
        <ul className="space-y-2">
          {Object.entries(BLOG_CATEGORIES).map(([key, cat]) => (
            <li key={key}>
              <Link
                href={`/tin-tuc?filter=${key}`}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-500 transition-colors duration-200"
              >
                <span>{cat.label}</span>
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {categoryCounts[key] ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title="Tag phổ biến">
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/tin-tuc?search=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-500 transition-colors duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </Widget>

      <Widget title="Xem nhiều nhất">
        <ul className="space-y-3">
          {mostViewedPosts.map((post, index) => (
            <li key={post.id}>
              <Link
                href={`/tin-tuc/${post.slug}`}
                className="flex items-start gap-3 group"
              >
                <span className="text-2xl font-bold text-primary-200 dark:text-primary-700 leading-none shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {getCategoryLabel(post.category)} · {formatViews(post.views)} lượt xem
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Widget>
    </aside>
  );
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-6">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
        {title}
      </h3>
      {children}
    </div>
  );
}
