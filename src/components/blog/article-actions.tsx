'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShareButton } from './share-menu';

type Props = {
  initialLikes: number;
  shareUrl: string;
  title: string;
  size?: 'default' | 'large';
};

export function ArticleActions({
  initialLikes,
  shareUrl,
  title,
  size = 'default',
}: Props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [animating, setAnimating] = useState(false);

  const handleLike = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={handleLike}
        className={cn(
          'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
          size === 'large' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm',
          liked
            ? 'bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/30'
            : 'bg-white dark:bg-dark-primary text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-300 hover:text-red-500'
        )}
        aria-label={liked ? 'Bỏ thích' : 'Thích bài viết'}
      >
        <svg
          className={cn(
            'transition-transform duration-300',
            size === 'large' ? 'size-6' : 'size-5',
            animating && 'scale-125',
            liked && 'fill-red-500 text-red-500'
          )}
          fill={liked ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <span>{likes}</span>
      </button>

      <ShareButton url={shareUrl} title={title} />
    </div>
  );
}
