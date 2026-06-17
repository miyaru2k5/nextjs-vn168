'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import { formatDate } from '@/lib/blog/utils';
import { BlogCard } from './blog-card';

type Props = {
  posts: BlogPost[];
  categoryLabel?: string;
};

export function RelatedArticles({ posts, categoryLabel }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (posts.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Bài viết liên quan
          </h2>
          {categoryLabel && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cùng danh mục: {categoryLabel}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="size-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-500 transition-colors"
            aria-label="Cuộn trái"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="size-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-500 transition-colors"
            aria-label="Cuộn phải"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-[300px] sm:w-[340px] shrink-0 snap-start"
          >
            <BlogCard post={post} variant="compact" />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-500 text-primary-500 text-sm font-medium hover:bg-primary-500 hover:text-white transition-all duration-200"
        >
          Xem thêm bài viết
        </Link>
      </div>
    </section>
  );
}

export function RelatedArticlesList({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="space-y-4">
      {posts.slice(0, 3).map((post) => (
        <li key={post.id}>
          <Link
            href={`/tin-tuc/${post.slug}`}
            className="group block"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-primary-500 transition-colors">
              {post.title}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {post.author.name} · {formatDate(post.publishedAt)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
