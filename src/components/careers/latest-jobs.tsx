import Link from 'next/link';
import type { JobPost } from '@/lib/careers/types';
import { CareersCard } from './careers-card';
import { ScrollAnimate } from '@/components/blog/scroll-animate';

type Props = {
  jobs: JobPost[];
};

export function LatestJobs({ jobs }: Props) {
  if (jobs.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Vị trí tuyển dụng mới
        </h2>
        <Link
          href="/tuyen-dung"
          className="text-sm font-medium text-primary-500 hover:underline hidden sm:inline"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {jobs.map((job, index) => (
          <ScrollAnimate key={job.id} delay={index * 80}>
            <CareersCard job={job} variant="compact" />
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}
