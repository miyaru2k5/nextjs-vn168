import { BlogListingSkeleton } from '@/components/blog/blog-card-skeleton';
import { BlogHero } from '@/components/blog/blog-hero';

export default function TinTucLoading() {
  return (
    <>
      <BlogHero />
      <BlogListingSkeleton />
    </>
  );
}
