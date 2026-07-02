import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleComments } from '@/components/blog/article-comments';
import { ArticleContent } from '@/components/blog/article-content';
import { ArticleEngagement } from '@/components/blog/article-engagement';
import { ArticleHeader } from '@/components/blog/article-header';
import {
  ArticleSidebar,
  ArticleSidebarMobile,
} from '@/components/blog/article-sidebar';
import { ArticleSchema } from '@/components/blog/article-schema';
import { LatestArticles } from '@/components/blog/latest-articles';
import { RelatedArticles } from '@/components/blog/related-articles';
import { blogPosts } from '@/lib/seed/mock-data';
import {
  extractTocFromContent,
  getCategoryLabel,
  getLatestPosts,
  getPostBySlug,
  getRelatedPosts,
  getSiteUrl,
} from '@/lib/blog/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Không tìm thấy bài viết' };
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/tin-tuc/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      url,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractTocFromContent(post.content);
  const relatedPosts = getRelatedPosts(post);
  const latestPosts = getLatestPosts(post.slug);
  const shareUrl = `${getSiteUrl()}/tin-tuc/${post.slug}`;

  return (
    <>
      <ArticleSchema post={post} />

      <article className="py-12 sm:py-16">
        <div className="wrapper">
          <div className="grid xl:grid-cols-[1fr_280px] gap-8 xl:gap-12">
            <div className="min-w-0">
              <ArticleHeader post={post} shareUrl={shareUrl} />
              <ArticleContent content={post.content} />
              <ArticleEngagement
                initialLikes={post.likes}
                shareUrl={shareUrl}
                title={post.title}
              />
              <ArticleComments postId={post.id} />
              <LatestArticles posts={latestPosts} />
              <RelatedArticles
                posts={relatedPosts}
                categoryLabel={getCategoryLabel(post.category)}
              />
            </div>

            <div className="hidden xl:block">
              <ArticleSidebar
                tocItems={tocItems}
                relatedPosts={relatedPosts}
                currentPost={post}
              />
            </div>
          </div>

          <ArticleSidebarMobile
            tocItems={tocItems}
            relatedPosts={relatedPosts}
            currentPost={post}
          />
        </div>
      </article>
    </>
  );
}
