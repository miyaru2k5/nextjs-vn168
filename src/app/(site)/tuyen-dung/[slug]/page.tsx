import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JobDetailClient } from '@/components/careers/job-detail-client';
import { JobSchema } from '@/components/careers/job-schema';
import { jobPosts } from '@/lib/careers/data';
import { getJobBySlug, getSiteUrl } from '@/lib/careers/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return jobPosts.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: 'Không tìm thấy vị trí tuyển dụng' };
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/tuyen-dung/${job.slug}`;

  return {
    title: `${job.title} - Tuyển dụng`,
    description: job.excerpt,
    openGraph: {
      title: job.title,
      description: job.excerpt,
      type: 'website',
      url,
      images: [
        {
          url: job.coverImage,
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: job.title,
      description: job.excerpt,
      images: [job.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <JobSchema job={job} />
      <JobDetailClient job={job} />
    </>
  );
}
