import type { JobPost } from '@/lib/careers/types';
import { getSiteUrl } from '@/lib/careers/utils';

type Props = {
  job: JobPost;
};

export function JobSchema({ job }: Props) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/tuyen-dung/${job.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt,
    validThrough: job.deadline,
    employmentType: mapEmploymentType(job.jobType),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'AIStarterKit',
      sameAs: siteUrl,
      logo: `${siteUrl}/images/logo-black.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'VN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: job.salaryCurrency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: 'MONTH',
      },
    },
    experienceRequirements: job.experience,
    skills: job.skills.join(', '),
    qualifications: job.requirements.join('. '),
    responsibilities: job.responsibilities.join('. '),
    industry: 'Technology',
    url,
    identifier: {
      '@type': 'PropertyValue',
      name: 'AIStarterKit',
      value: job.id,
    },
    directApply: true,
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Vietnam',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function mapEmploymentType(jobType: JobPost['jobType']): string {
  const map: Record<JobPost['jobType'], string> = {
    'full-time': 'FULL_TIME',
    'part-time': 'PART_TIME',
    intern: 'INTERN',
    remote: 'FULL_TIME',
  };
  return map[jobType];
}
