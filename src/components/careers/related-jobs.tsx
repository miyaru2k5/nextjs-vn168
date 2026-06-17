'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { JobPost } from '@/lib/careers/types';
import {
  formatSalary,
  getDepartmentLabel,
} from '@/lib/careers/utils';

type Props = {
  jobs: JobPost[];
  departmentLabel?: string;
};

export function RelatedJobs({ jobs, departmentLabel }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (jobs.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Tuyển dụng liên quan
          </h2>
          {departmentLabel && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cùng phòng ban: {departmentLabel}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="size-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-500 transition-colors"
            aria-label="Cuộn trái"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="size-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-500 transition-colors"
            aria-label="Cuộn phải"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            className="w-[300px] sm:w-[340px] shrink-0 snap-start rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5 hover:shadow-theme-md hover:-translate-y-0.5 transition-all duration-300"
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
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 line-clamp-2">
                  {job.title}
                </h3>
                <p className="text-xs text-primary-500">{getDepartmentLabel(job.department)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {job.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4">
              <span className="font-medium text-primary-500">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
              <span>·</span>
              <span>{job.location}</span>
              <span>·</span>
              <span>{job.experience}</span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/tuyen-dung/${job.slug}`}
                className="flex-1 text-center px-3 py-2 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300 hover:text-primary-500 transition-colors"
              >
                Chi tiết
              </Link>
              <Link
                href={`/tuyen-dung/${job.slug}#apply`}
                className="flex-1 text-center px-3 py-2 rounded-full text-xs font-medium bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              >
                Ứng tuyển
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/tuyen-dung"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-500 text-primary-500 text-sm font-medium hover:bg-primary-500 hover:text-white transition-all duration-200"
        >
          Xem thêm vị trí
        </Link>
      </div>
    </section>
  );
}
