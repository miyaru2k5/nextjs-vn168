import Image from 'next/image';
import Link from 'next/link';
import type { JobPost } from '@/lib/careers/types';
import {
  formatDate,
  formatSalary,
  formatViews,
  getDepartmentLabel,
  getJobTypeLabel,
  isJobExpired,
} from '@/lib/careers/utils';
import { cn } from '@/lib/utils';

type Props = {
  job: JobPost;
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
  onApply?: () => void;
};

export function CareersCard({ job, variant = 'default', className, onApply }: Props) {
  const expired = isJobExpired(job.deadline);

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/tuyen-dung/${job.slug}`}
        className={cn(
          'group flex gap-4 p-4 rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 hover:shadow-theme-md hover:-translate-y-0.5 transition-all duration-300',
          className
        )}
      >
        <div className="relative size-12 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
          <Image
            src={job.companyLogo}
            alt="AIStarterKit"
            fill
            sizes="48px"
            className="object-contain p-1"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {job.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {job.location} · {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/tuyen-dung/${job.slug}`}
        className={cn(
          'group block rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5 hover:shadow-theme-md hover:-translate-y-1 transition-all duration-300',
          className
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="relative size-10 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0">
            <Image
              src={job.companyLogo}
              alt="AIStarterKit"
              fill
              sizes="40px"
              className="object-contain p-1"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-primary-500 transition-colors">
              {job.title}
            </h3>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-1.5">
            <LocationIcon />
            {job.location}
          </p>
          <p className="font-medium text-primary-500">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
          <p>{getJobTypeLabel(job.jobType)}</p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400">{formatDate(job.publishedAt)}</span>
          <span className="text-sm font-medium text-primary-500 group-hover:underline">
            Xem chi tiết →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div
      className={cn(
        'group rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-6 hover:shadow-theme-md hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative size-14 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0 border border-gray-100 dark:border-gray-700">
          <Image
            src={job.companyLogo}
            alt="AIStarterKit"
            fill
            sizes="56px"
            className="object-contain p-1.5"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/tuyen-dung/${job.slug}`}>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 line-clamp-2 group-hover:text-primary-500 transition-colors duration-200">
                {job.title}
              </h3>
            </Link>
            {job.featured && (
              <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500 text-white">
                Nổi bật
              </span>
            )}
          </div>
          <p className="text-sm text-primary-500 font-medium mt-1">
            {getDepartmentLabel(job.department)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <MetaBadge icon={<LocationIcon />}>{job.location}</MetaBadge>
        <MetaBadge icon={<BriefcaseIcon />}>{getJobTypeLabel(job.jobType)}</MetaBadge>
        <MetaBadge icon={<MoneyIcon />}>
          {formatSalary(job.salaryMin, job.salaryMax)}
        </MetaBadge>
        <MetaBadge icon={<ClockIcon />}>{job.experience}</MetaBadge>
        <MetaBadge icon={<UsersIcon />}>{job.headcount} vị trí</MetaBadge>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {job.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2.5 py-1 rounded-full text-xs text-gray-400">
            +{job.skills.length - 4}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>{formatDate(job.publishedAt)}</span>
          <span className={cn(expired && 'text-red-500')}>
            Hạn: {formatDate(job.deadline)}
          </span>
          <span className="flex items-center gap-1">
            <EyeIcon />
            {formatViews(job.views)}
          </span>
          <span className="flex items-center gap-1">
            <HeartIcon />
            {job.likes}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/tuyen-dung/${job.slug}`}
            className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300 hover:text-primary-500 transition-all duration-200"
          >
            Xem chi tiết
          </Link>
          {onApply ? (
            <button
              onClick={onApply}
              disabled={expired}
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none"
            >
              Ứng tuyển ngay
            </button>
          ) : (
            <Link
              href={`/tuyen-dung/${job.slug}#apply`}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200',
                expired && 'opacity-50 pointer-events-none'
              )}
            >
              Ứng tuyển ngay
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaBadge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">
      <span className="text-gray-400">{icon}</span>
      {children}
    </span>
  );
}

function LocationIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.018V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}