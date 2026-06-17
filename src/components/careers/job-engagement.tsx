'use client';

import { JobActions } from './job-actions';

type Props = {
  initialLikes: number;
  shareUrl: string;
  title: string;
  onApply?: () => void;
};

export function JobEngagement({ initialLikes, shareUrl, title, onApply }: Props) {
  return (
    <section className="mt-12 py-8 px-6 rounded-[20px] bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-500/10 dark:to-purple-500/10 border border-primary-100 dark:border-primary-500/20">
      <p className="text-center text-gray-600 dark:text-gray-300 mb-4 font-medium">
        Bạn quan tâm đến vị trí này?
      </p>
      <div className="flex justify-center">
        <JobActions
          initialLikes={initialLikes}
          shareUrl={shareUrl}
          title={title}
          size="large"
          onApply={onApply}
        />
      </div>
    </section>
  );
}
