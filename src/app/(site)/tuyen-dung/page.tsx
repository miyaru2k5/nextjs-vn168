import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CareersHero } from '@/components/careers/careers-hero';
import { CareersListing } from '@/components/careers/careers-listing';
import { CareersListingSkeleton } from '@/components/careers/careers-card-skeleton';
import { getPublishedJobs } from '@/lib/careers/utils';
import type { JobFilter, JobSearchParams } from '@/lib/careers/types';

export const metadata: Metadata = {
  title: 'Tuyển dụng',
  description:
    'Khám phá các vị trí tuyển dụng tại AIStarterKit — cơ hội nghề nghiệp trong lĩnh vực AI, công nghệ và sản phẩm số.',
  openGraph: {
    title: 'Tuyển dụng | AIStarterKit',
    description:
      'Khám phá các vị trí tuyển dụng phù hợp và đồng hành phát triển cùng chúng tôi.',
    type: 'website',
  },
};

type Props = {
  searchParams: Promise<{
    filter?: string;
    title?: string;
    skill?: string;
    department?: string;
    location?: string;
    search?: string;
  }>;
};

export default async function TuyenDungPage({ searchParams }: Props) {
  const params = await searchParams;
  const jobs = getPublishedJobs();
  const initialFilter = (params.filter as JobFilter) ?? 'all';
  const initialSearch: JobSearchParams = {
    title: params.title ?? params.search ?? '',
    skill: params.skill ?? '',
    department: params.department ?? '',
    location: params.location ?? '',
  };

  return (
    <>
      <CareersHero />
      <Suspense fallback={<CareersListingSkeleton />}>
        <CareersListing
          jobs={jobs}
          initialFilter={initialFilter}
          initialSearch={initialSearch}
        />
      </Suspense>
    </>
  );
}
