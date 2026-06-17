import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import { BlogCard } from './blog-card';
import { ScrollAnimate } from './scroll-animate';

type Props = {
  posts: BlogPost[];
};

export function LatestArticles({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Bài viết mới nhất
        </h2>
        <Link
          href="/tin-tuc"
          className="text-sm font-medium text-primary-500 hover:underline hidden sm:inline"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <ScrollAnimate key={post.id} delay={index * 80}>
            <BlogCard post={post} variant="compact" />
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}
