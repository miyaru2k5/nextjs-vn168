'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShareButton } from '@/components/blog/share-menu';

type Props = {
  initialLikes: number;
  shareUrl: string;
  title: string;
  size?: 'default' | 'large';
  onApply?: () => void;
  showApply?: boolean;
};

export function JobActions({
  initialLikes,
  shareUrl,
  title,
  size = 'default',
  onApply,
  showApply = true,
}: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [animating, setAnimating] = useState(false);

  const handleLike = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {showApply && onApply && (
        <button
          onClick={onApply}
          className={cn(
            'inline-flex items-center gap-2 rounded-full font-medium bg-primary-500 hover:bg-primary-600 text-white transition-all duration-200',
            size === 'large' ? 'px-6 py-3 text-base' : 'px-5 py-2.5 text-sm'
          )}
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          Ứng tuyển ngay
        </button>
      )}

      <button
        onClick={() => setSaved(!saved)}
        className={cn(
          'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
          size === 'large' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm',
          saved
            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-500 border border-primary-200 dark:border-primary-500/30'
            : 'bg-white dark:bg-dark-primary text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:text-primary-500'
        )}
        aria-label={saved ? 'Bỏ lưu công việc' : 'Lưu công việc'}
      >
        <svg
          className={cn('size-5', saved && 'fill-primary-500 text-primary-500')}
          fill={saved ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
        {saved ? 'Đã lưu' : 'Lưu công việc'}
      </button>

      <button
        onClick={handleLike}
        className={cn(
          'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
          size === 'large' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm',
          liked
            ? 'bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/30'
            : 'bg-white dark:bg-dark-primary text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-red-300 hover:text-red-500'
        )}
        aria-label={liked ? 'Bỏ thích' : 'Thích công việc'}
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <span>{likes}</span>
      </button>

      <ShareButton url={shareUrl} title={title} />
    </div>
  );
}
