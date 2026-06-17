'use client';

import { useCallback, useMemo, useState } from 'react';
import type { BlogPost } from '@/lib/blog/types';
import type { BlogCategoryFilter } from '@/lib/blog/types';
import {
  filterPosts,
  paginatePosts,
  POSTS_PER_PAGE,
  getCategoryCounts,
} from '@/lib/blog/utils';
import { Pagination } from '@/components/ui/pagination';
import { BlogCard } from './blog-card';
import { BlogFilters } from './blog-filters';
import { BlogSearch } from './blog-search';
import { BlogSidebar } from './blog-sidebar';
import { ScrollAnimate } from './scroll-animate';
import {
  getFeaturedPosts,
  getMostViewedPosts,
} from '@/lib/blog/utils';

type Props = {
  posts: BlogPost[];
  initialFilter?: BlogCategoryFilter;
  initialSearch?: string;
};

export function BlogListing({ posts, initialFilter = 'all', initialSearch = '' }: Props) {
  const [filter, setFilter] = useState<BlogCategoryFilter>(initialFilter);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterPosts(posts, filter, search),
    [posts, filter, search]
  );

  const { items, currentPage, totalPages } = useMemo(
    () => paginatePosts(filtered, page, POSTS_PER_PAGE),
    [filtered, page]
  );

  const handleFilterChange = useCallback((newFilter: BlogCategoryFilter) => {
    setFilter(newFilter);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const categoryCounts = useMemo(() => getCategoryCounts(), []);
  const featuredPosts = useMemo(() => getFeaturedPosts(), []);
  const mostViewedPosts = useMemo(() => getMostViewedPosts(), []);

  return (
    <section className="pb-20">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-8">
          <BlogSearch value={search} onChange={handleSearchChange} />
        </div>

        <div className="mb-8 overflow-x-auto pb-2 -mx-1 px-1">
          <BlogFilters
            active={filter}
            onChange={handleFilterChange}
            counts={categoryCounts}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 xl:gap-12">
          <div>
            {items.length === 0 ? (
              <div className="text-center py-20 rounded-[20px] bg-white dark:bg-dark-primary shadow-one">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Không tìm thấy bài viết nào.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {items.map((post, index) => (
                  <ScrollAnimate key={post.id} delay={index * 80}>
                    <BlogCard post={post} />
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
              <BlogSidebar
                featuredPosts={featuredPosts}
                mostViewedPosts={mostViewedPosts}
                categoryCounts={categoryCounts}
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-12 space-y-6">
          <BlogSidebar
            featuredPosts={featuredPosts}
            mostViewedPosts={mostViewedPosts}
            categoryCounts={categoryCounts}
          />
        </div>
      </div>
    </section>
  );
}
