import Link from 'next/link';
import type { JobPost } from '@/lib/careers/types';
import { POPULAR_INDUSTRIES, POPULAR_SKILLS } from '@/lib/careers/types';
import { formatViews, getDepartmentLabel } from '@/lib/careers/utils';
import { CareersCard } from './careers-card';

type Props = {
  featuredJobs: JobPost[];
  mostViewedJobs: JobPost[];
};

export function CareersSidebar({ featuredJobs, mostViewedJobs }: Props) {
  return (
    <aside className="space-y-6">
      <Widget title="Vị trí tuyển dụng nổi bật">
        <div className="space-y-4">
          {featuredJobs.slice(0, 4).map((job) => (
            <CareersCard key={job.id} job={job} variant="horizontal" />
          ))}
        </div>
      </Widget>

      <Widget title="Ngành nghề phổ biến">
        <div className="flex flex-wrap gap-2">
          {POPULAR_INDUSTRIES.map((industry) => (
            <Link
              key={industry}
              href={`/tuyen-dung?search=${encodeURIComponent(industry)}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-500 transition-colors duration-200"
            >
              {industry}
            </Link>
          ))}
        </div>
      </Widget>

      <Widget title="Kỹ năng đang được tìm kiếm">
        <div className="flex flex-wrap gap-2">
          {POPULAR_SKILLS.map((skill) => (
            <Link
              key={skill}
              href={`/tuyen-dung?skill=${encodeURIComponent(skill)}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors duration-200"
            >
              {skill}
            </Link>
          ))}
        </div>
      </Widget>

      <Widget title="Công việc xem nhiều nhất">
        <ul className="space-y-3">
          {mostViewedJobs.map((job, index) => (
            <li key={job.id}>
              <Link
                href={`/tuyen-dung/${job.slug}`}
                className="flex items-start gap-3 group"
              >
                <span className="text-2xl font-bold text-primary-200 dark:text-primary-700 leading-none shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {getDepartmentLabel(job.department)} · {formatViews(job.views)} lượt xem
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
