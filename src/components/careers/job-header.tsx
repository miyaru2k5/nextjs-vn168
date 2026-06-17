import Image from 'next/image';
import type { JobPost } from '@/lib/careers/types';
import {
  formatDate,
  formatSalary,
  formatViews,
  getDepartmentLabel,
  getJobTypeLabel,
  getLevelLabel,
  isJobExpired,
} from '@/lib/careers/utils';
import { cn } from '@/lib/utils';
import { JobActions } from './job-actions';

type Props = {
  job: JobPost;
  shareUrl: string;
  onApply: () => void;
};

export function JobHeader({ job, shareUrl, onApply }: Props) {
  const expired = isJobExpired(job.deadline);

  return (
    <header>
      <div className="relative aspect-[21/9] sm:aspect-[21/8] rounded-[20px] overflow-hidden mb-8">
        <Image
          src={job.coverImage}
          alt={job.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <div className="relative size-14 rounded-xl overflow-hidden bg-white shadow-lg">
            <Image
              src={job.companyLogo}
              alt="AIStarterKit"
              fill
              sizes="56px"
              className="object-contain p-2"
            />
          </div>
          <div>
            <p className="text-white font-semibold">AIStarterKit</p>
            <p className="text-white/80 text-sm">{getDepartmentLabel(job.department)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300">
          {getDepartmentLabel(job.department)}
        </span>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {getJobTypeLabel(job.jobType)}
        </span>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {getLevelLabel(job.level)}
        </span>
        {expired && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
            Hết hạn ứng tuyển
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-800 dark:text-white/90 leading-tight mb-4">
        {job.title}
      </h1>

      <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-3xl">
        {job.excerpt}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <InfoItem icon="location" label="Địa điểm" value={job.location} />
        <InfoItem
          icon="salary"
          label="Mức lương"
          value={formatSalary(job.salaryMin, job.salaryMax)}
          highlight
        />
        <InfoItem icon="experience" label="Kinh nghiệm" value={job.experience} />
        <InfoItem icon="headcount" label="Số lượng" value={`${job.headcount} vị trí`} />
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-700">
        <span>Đăng ngày: {formatDate(job.publishedAt)}</span>
        <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
        <span className={cn(expired && 'text-red-500')}>
          Hạn ứng tuyển: {formatDate(job.deadline)}
        </span>
        <span className="hidden sm:inline text-gray-300 dark:text-gray-600">·</span>
        <span>{formatViews(job.views)} lượt xem</span>
      </div>

      <div className="py-6">
        <JobActions
          initialLikes={job.likes}
          shareUrl={shareUrl}
          title={job.title}
          onApply={onApply}
          showApply={!expired}
        />
      </div>
    </header>
  );
}

function InfoItem({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div className="size-10 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 shrink-0">
        <InfoIcon type={icon} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p
          className={cn(
            'text-sm font-semibold',
            highlight
              ? 'text-primary-500'
              : 'text-gray-800 dark:text-white/90'
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoIcon({ type }: { type: string }) {
  const className = 'size-5';
  switch (type) {
    case 'location':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      );
    case 'salary':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'experience':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.018V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
  }
}
