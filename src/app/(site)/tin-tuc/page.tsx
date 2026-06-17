import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogHero } from '@/components/blog/blog-hero';
import { BlogListing } from '@/components/blog/blog-listing';
import { BlogListingSkeleton } from '@/components/blog/blog-card-skeleton';
import { getPublishedPosts } from '@/lib/blog/utils';
import type { BlogCategoryFilter } from '@/lib/blog/types';

export const metadata: Metadata = {
  title: 'Tin tức & Kiến thức',
  description:
    'Khám phá các bài viết mới nhất về AI, công nghệ, hướng dẫn sử dụng và cập nhật sản phẩm từ AIStarterKit.',
  openGraph: {
    title: 'Tin tức & Kiến thức | AIStarterKit',
    description:
      'Khám phá các bài viết mới nhất về AI, công nghệ, hướng dẫn và cập nhật sản phẩm.',
    type: 'website',
  },
};

type Props = {
  searchParams: Promise<{ filter?: string; search?: string }>;
};

export default async function TinTucPage({ searchParams }: Props) {
  const params = await searchParams;
  const posts = getPublishedPosts();
  const initialFilter = (params.filter as BlogCategoryFilter) ?? 'all';
  const initialSearch = params.search ?? '';

  return (
    <>
      <BlogHero />
      <Suspense fallback={<BlogListingSkeleton />}>
        <BlogListing
          posts={posts}
          initialFilter={initialFilter}
          initialSearch={initialSearch}
        />
      </Suspense>
    </>
  );
}
