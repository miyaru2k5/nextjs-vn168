'use client';

import { useCallback, useMemo, useState } from 'react';
import type { JobPost, JobFilter, JobSearchParams } from '@/lib/careers/types';
import {
  filterJobs,
  paginateJobs,
  JOBS_PER_PAGE,
  getFilterCounts,
  getFeaturedJobs,
  getMostViewedJobs,
} from '@/lib/careers/utils';
import { Pagination } from '@/components/ui/pagination';
import { ScrollAnimate } from '@/components/blog/scroll-animate';
import { CareersCard } from './careers-card';
import { CareersFilters } from './careers-filters';
import { CareersSearch } from './careers-search';
import { CareersSidebar } from './careers-sidebar';

type Props = {
  jobs: JobPost[];
  initialFilter?: JobFilter;
  initialSearch?: JobSearchParams;
};

const EMPTY_SEARCH: JobSearchParams = {
  title: '',
  skill: '',
  department: '',
  location: '',
};

export function CareersListing({
  jobs,
  initialFilter = 'all',
  initialSearch = EMPTY_SEARCH,
}: Props) {
  const [filter, setFilter] = useState<JobFilter>(initialFilter);
  const [search, setSearch] = useState<JobSearchParams>(initialSearch);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterJobs(jobs, filter, search),
    [jobs, filter, search]
  );

  const { items, currentPage, totalPages } = useMemo(
    () => paginateJobs(filtered, page, JOBS_PER_PAGE),
    [filtered, page]
  );

  const handleFilterChange = useCallback((newFilter: JobFilter) => {
    setFilter(newFilter);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: JobSearchParams) => {
    setSearch(value);
    setPage(1);
  }, []);

  const filterCounts = useMemo(() => getFilterCounts(), []);
  const featuredJobs = useMemo(() => getFeaturedJobs(), []);
  const mostViewedJobs = useMemo(() => getMostViewedJobs(), []);

  return (
    <section className="pb-20">
      <div className="wrapper">
        <div className="mb-8">
          <CareersSearch value={search} onChange={handleSearchChange} />
        </div>

        <div className="mb-8 overflow-x-auto pb-2 -mx-1 px-1">
          <CareersFilters
            active={filter}
            onChange={handleFilterChange}
            counts={filterCounts}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 xl:gap-12">
          <div>
            {items.length === 0 ? (
              <div className="text-center py-20 rounded-[20px] bg-white dark:bg-dark-primary shadow-one">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Không tìm thấy vị trí tuyển dụng nào.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {items.map((job, index) => (
                  <ScrollAnimate key={job.id} delay={index * 80}>
                    <CareersCard job={job} />
                  </ScrollAnimate>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CareersSidebar
                featuredJobs={featuredJobs}
                mostViewedJobs={mostViewedJobs}
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-12">
          <CareersSidebar
            featuredJobs={featuredJobs}
            mostViewedJobs={mostViewedJobs}
          />
        </div>
      </div>
    </section>
  );
}
