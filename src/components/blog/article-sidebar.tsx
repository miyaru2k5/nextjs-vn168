import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/types';
import { getCategoryLabel } from '@/lib/blog/utils';
import { RelatedArticlesList } from './related-articles';
import { TableOfContents } from './table-of-contents';
import type { TocItem } from '@/lib/blog/types';

type Props = {
  tocItems: TocItem[];
  relatedPosts: BlogPost[];
  currentPost: BlogPost;
};

export function ArticleSidebar({ tocItems, relatedPosts, currentPost }: Props) {
  return (
    <aside className="space-y-6">
      <div className="sticky top-24 space-y-6">
        <TableOfContents items={tocItems} />

        <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5 hidden xl:block">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-4 uppercase tracking-wide">
            Tag
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentPost.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tin-tuc?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-500 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-4">
            Bài viết liên quan
          </h3>
          <RelatedArticlesList posts={relatedPosts} />
        </div>
      </div>
    </aside>
  );
}

export function ArticleSidebarMobile({
  tocItems,
  relatedPosts,
  currentPost,
}: Props) {
  return (
    <div className="xl:hidden space-y-6 mt-8">
      <TableOfContents items={tocItems} />
      <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-4">
          Tag
        </h3>
        <div className="flex flex-wrap gap-2">
          {currentPost.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tin-tuc?search=${encodeURIComponent(tag)}`}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-4">
          Liên quan · {getCategoryLabel(currentPost.category)}
        </h3>
        <RelatedArticlesList posts={relatedPosts} />
      </div>
    </div>
  );
}
