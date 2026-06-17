'use client';

import { ArticleActions } from './article-actions';

type Props = {
  initialLikes: number;
  shareUrl: string;
  title: string;
};

export function ArticleEngagement({ initialLikes, shareUrl, title }: Props) {
  return (
    <section className="mt-12 py-8 px-6 rounded-[20px] bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-500/10 dark:to-purple-500/10 border border-primary-100 dark:border-primary-500/20">
      <p className="text-center text-gray-600 dark:text-gray-300 mb-4 font-medium">
        Bài viết này có hữu ích với bạn không?
      </p>
      <div className="flex justify-center">
        <ArticleActions
          initialLikes={initialLikes}
          shareUrl={shareUrl}
          title={title}
          size="large"
        />
      </div>
    </section>
  );
}
