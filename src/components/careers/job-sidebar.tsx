'use client';

import Image from 'next/image';
import type { JobPost } from '@/lib/careers/types';
import {
  formatDate,
  formatSalary,
  getDepartmentLabel,
  getJobTypeLabel,
  getLevelLabel,
  isJobExpired,
} from '@/lib/careers/utils';
import { cn } from '@/lib/utils';

type Props = {
  job: JobPost;
  onApply: () => void;
};

export function JobSidebar({ job, onApply }: Props) {
  const expired = isJobExpired(job.deadline);

  return (
    <aside className="space-y-6">
      <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 dark:border-gray-800">
          <div className="relative size-12 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
            <Image
              src={job.companyLogo}
              alt="AIStarterKit"
              fill
              sizes="48px"
              className="object-contain p-1"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white/90 text-sm">
              AIStarterKit
            </p>
            <p className="text-xs text-gray-400">{getDepartmentLabel(job.department)}</p>
          </div>
        </div>

        <dl className="space-y-3 text-sm mb-6">
          <SidebarItem label="Mức lương" value={formatSalary(job.salaryMin, job.salaryMax)} highlight />
          <SidebarItem label="Địa điểm" value={job.location} />
          <SidebarItem label="Hình thức" value={getJobTypeLabel(job.jobType)} />
          <SidebarItem label="Cấp bậc" value={getLevelLabel(job.level)} />
          <SidebarItem label="Kinh nghiệm" value={job.experience} />
          <SidebarItem label="Số lượng" value={`${job.headcount} vị trí`} />
          <SidebarItem label="Hạn nộp" value={formatDate(job.deadline)} expired={expired} />
        </dl>

        <button
          onClick={onApply}
          disabled={expired}
          className={cn(
            'w-full h-12 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors duration-200',
            expired && 'opacity-50 pointer-events-none'
          )}
        >
          {expired ? 'Đã hết hạn' : 'Ứng tuyển ngay'}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  label,
  value,
  highlight,
  expired,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  expired?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-gray-400 shrink-0">{label}</dt>
      <dd
        className={cn(
          'font-medium text-right',
          highlight && 'text-primary-500',
          expired && 'text-red-500',
          !highlight && !expired && 'text-gray-800 dark:text-white/90'
        )}
      >
        {value}
      </dd>
    </div>
  );
}

export function JobSidebarMobile({ job, onApply }: Props) {
  const expired = isJobExpired(job.deadline);

  return (
    <div className="xl:hidden mt-8">
      <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
          Thông tin nhanh
        </h3>
        <dl className="grid grid-cols-2 gap-3 text-sm mb-5">
          <SidebarItem label="Lương" value={formatSalary(job.salaryMin, job.salaryMax)} highlight />
          <SidebarItem label="Địa điểm" value={job.location} />
          <SidebarItem label="Hình thức" value={getJobTypeLabel(job.jobType)} />
          <SidebarItem label="Hạn nộp" value={formatDate(job.deadline)} expired={expired} />
        </dl>
        <button
          onClick={onApply}
          disabled={expired}
          className={cn(
            'w-full h-11 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors',
            expired && 'opacity-50 pointer-events-none'
          )}
        >
          Ứng tuyển ngay
        </button>
      </div>
    </div>
  );
}
