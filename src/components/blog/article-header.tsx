import Image from 'next/image';
import type { BlogPost } from '@/lib/blog/types';
import {
  formatDate,
  formatViews,
  getCategoryLabel,
} from '@/lib/blog/utils';
import { ArticleActions } from './article-actions';

type Props = {
  post: BlogPost;
  shareUrl: string;
};

export function ArticleHeader({ post, shareUrl }: Props) {
  return (
    <header>
      <div className="relative aspect-[21/9] sm:aspect-[21/8] rounded-[20px] overflow-hidden mb-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300 mb-4">
        {getCategoryLabel(post.category)}
      </span>

      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-800 dark:text-white/90 leading-tight mb-4">
        {post.title}
      </h1>

      <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl">
        {post.excerpt}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full size-12 object-cover ring-2 ring-primary-100 dark:ring-primary-500/30"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white/90">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.author.role}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
          <span>{post.readTime} phút đọc</span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
          <span>{formatViews(post.views)} lượt xem</span>
        </div>
      </div>

      <div className="py-6">
        <ArticleActions
          initialLikes={post.likes}
          shareUrl={shareUrl}
          title={post.title}
        />
      </div>
    </header>
  );
}
