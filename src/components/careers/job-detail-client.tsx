'use client';

import { useCallback, useState } from 'react';
import type { JobPost } from '@/lib/careers/types';
import {
  getDepartmentLabel,
  getLatestJobs,
  getRelatedJobs,
  getSiteUrl,
  isJobExpired,
} from '@/lib/careers/utils';
import { JobHeader } from './job-header';
import { JobContent } from './job-content';
import { JobEngagement } from './job-engagement';
import { JobComments } from './job-comments';
import { JobApplyForm } from './job-apply-form';
import { JobSidebar, JobSidebarMobile } from './job-sidebar';
import { LatestJobs } from './latest-jobs';
import { RelatedJobs } from './related-jobs';
import { JobStickyBar } from './job-sticky-bar';

type Props = {
  job: JobPost;
};

export function JobDetailClient({ job }: Props) {
  const [applyOpen, setApplyOpen] = useState(false);
  const shareUrl = `${getSiteUrl()}/tuyen-dung/${job.slug}`;
  const expired = isJobExpired(job.deadline);
  const relatedJobs = getRelatedJobs(job);
  const latestJobs = getLatestJobs(job.slug);

  const handleApply = useCallback(() => {
    if (!expired) {
      setApplyOpen(true);
    }
  }, [expired]);

  const scrollToApply = useCallback(() => {
    if (!expired) {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [expired]);

  return (
    <>
      <article className="py-12 sm:py-16 pb-28 lg:pb-16">
        <div className="wrapper">
          <div className="grid xl:grid-cols-[1fr_280px] gap-8 xl:gap-12">
            <div className="min-w-0">
              <JobHeader job={job} shareUrl={shareUrl} onApply={handleApply} />
              <JobContent job={job} />
              <JobEngagement
                initialLikes={job.likes}
                shareUrl={shareUrl}
                title={job.title}
                onApply={handleApply}
              />
              <JobApplyForm
                jobTitle={job.title}
                isOpen={applyOpen}
                onClose={() => setApplyOpen(false)}
                variant="inline"
              />
              <JobComments jobId={job.id} />
              <LatestJobs jobs={latestJobs} />
              <RelatedJobs
                jobs={relatedJobs}
                departmentLabel={getDepartmentLabel(job.department)}
              />
            </div>

            <div className="hidden xl:block">
              <JobSidebar job={job} onApply={scrollToApply} />
            </div>
          </div>

          <JobSidebarMobile job={job} onApply={scrollToApply} />
        </div>
      </article>

      <JobStickyBar onApply={handleApply} disabled={expired} />

      <JobApplyForm
        jobTitle={job.title}
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
        variant="modal"
      />
    </>
  );
}
