import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import {
  formatDate,
  formatViews,
  getCategoryLabel,
} from '@/lib/blog/utils';
import { cn } from '@/lib/utils';

type Props = {
  post: BlogPost;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
};

export function BlogCard({ post, variant = 'default', className }: Props) {
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/tin-tuc/${post.slug}`}
        className={cn(
          'group flex gap-4 p-4 rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 hover:shadow-theme-md hover:-translate-y-0.5 transition-all duration-300',
          className
        )}
      >
        <div className="relative w-28 h-20 sm:w-36 sm:h-24 shrink-0 rounded-xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="144px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-primary-500">
            {getCategoryLabel(post.category)}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2 mt-1 group-hover:text-primary-500 transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/tin-tuc/${post.slug}`}
        className={cn(
          'group block rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-theme-md hover:-translate-y-1 transition-all duration-300',
          className
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <span className="text-xs font-medium text-primary-500">
            {getCategoryLabel(post.category)}
          </span>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 line-clamp-2 mt-2 group-hover:text-primary-500 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
            <span className="text-sm font-medium text-primary-500 group-hover:underline">
              Đọc tiếp →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className={cn(
        'group block rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-theme-md hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {post.featured && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-primary-500 text-white">
            Nổi bật
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-medium text-primary-500 uppercase tracking-wide">
          {getCategoryLabel(post.category)}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 line-clamp-2 mt-2 group-hover:text-primary-500 transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={32}
            height={32}
            className="rounded-full size-8 object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime} phút đọc
            </span>
            <span className="flex items-center gap-1">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {formatViews(post.views)}
            </span>
            <span className="flex items-center gap-1">
              <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {post.likes}
            </span>
          </div>
          <span className="text-sm font-medium text-primary-500 group-hover:underline">
            Đọc tiếp
          </span>
        </div>
      </div>
    </Link>
  );
}
