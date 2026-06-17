import { jobPosts } from './data';
import type { JobFilter, JobPost, JobSearchParams } from './types';
import { JOB_DEPARTMENTS, JOB_LEVELS, JOB_TYPES } from './types';

export const JOBS_PER_PAGE = 6;

export function getPublishedJobs(): JobPost[] {
  return [...jobPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getJobBySlug(slug: string): JobPost | undefined {
  return jobPosts.find((job) => job.slug === slug);
}

export function getFeaturedJobs(limit = 4): JobPost[] {
  return getPublishedJobs()
    .filter((job) => job.featured)
    .slice(0, limit);
}

export function getMostViewedJobs(limit = 5): JobPost[] {
  return [...jobPosts].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getLatestJobs(excludeSlug?: string, limit = 4): JobPost[] {
  return getPublishedJobs()
    .filter((job) => job.slug !== excludeSlug)
    .slice(0, limit);
}

export function getRelatedJobs(job: JobPost, limit = 4): JobPost[] {
  const scored = jobPosts
    .filter((j) => j.slug !== job.slug)
    .map((j) => {
      let score = 0;
      if (j.department === job.department) score += 3;
      if (j.level === job.level) score += 2;
      if (j.location === job.location) score += 2;
      const sharedSkills = j.skills.filter((s) => job.skills.includes(s));
      score += sharedSkills.length * 2;
      return { job: j, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length >= limit) {
    return scored.slice(0, limit).map(({ job }) => job);
  }

  const related = scored.map(({ job }) => job);
  const remaining = getPublishedJobs()
    .filter((j) => j.slug !== job.slug && !related.find((r) => r.slug === j.slug))
    .slice(0, limit - related.length);

  return [...related, ...remaining];
}

export function filterJobs(
  jobs: JobPost[],
  filter: JobFilter,
  search: JobSearchParams
): JobPost[] {
  let result = jobs;

  if (filter === 'salary-high') {
    result = result.filter((job) => job.salaryMax >= 40000000);
  } else if (filter === 'salary-mid') {
    result = result.filter(
      (job) => job.salaryMax >= 20000000 && job.salaryMax < 40000000
    );
  } else if (filter !== 'all') {
    if (filter in JOB_TYPES) {
      result = result.filter((job) => job.jobType === filter);
    } else if (filter in JOB_DEPARTMENTS) {
      result = result.filter((job) => job.department === filter);
    } else if (filter in JOB_LEVELS) {
      result = result.filter((job) => job.level === filter);
    }
  }

  if (search.title.trim()) {
    const query = search.title.toLowerCase().trim();
    result = result.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.excerpt.toLowerCase().includes(query)
    );
  }

  if (search.skill.trim()) {
    const query = search.skill.toLowerCase().trim();
    result = result.filter((job) =>
      job.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  }

  if (search.department.trim()) {
    const query = search.department.toLowerCase().trim();
    result = result.filter((job) => {
      const deptLabel = JOB_DEPARTMENTS[job.department].label.toLowerCase();
      return deptLabel.includes(query) || job.department.includes(query);
    });
  }

  if (search.location.trim()) {
    const query = search.location.toLowerCase().trim();
    result = result.filter((job) => job.location.toLowerCase().includes(query));
  }

  return result;
}

export function paginateJobs<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}

export function getDepartmentLabel(department: JobPost['department']): string {
  return JOB_DEPARTMENTS[department]?.label ?? department;
}

export function getJobTypeLabel(jobType: JobPost['jobType']): string {
  return JOB_TYPES[jobType]?.label ?? jobType;
}

export function getLevelLabel(level: JobPost['level']): string {
  return JOB_LEVELS[level]?.label ?? level;
}

export function formatSalary(min: number, max: number, currency = 'VND'): string {
  const format = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)} triệu`;
    return n.toLocaleString('vi-VN');
  };
  return `${format(min)} - ${format(max)} ${currency}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return formatDate(dateStr);
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toString();
}

export function getFilterCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: jobPosts.length };
  jobPosts.forEach((job) => {
    counts[job.jobType] = (counts[job.jobType] ?? 0) + 1;
    counts[job.department] = (counts[job.department] ?? 0) + 1;
    counts[job.level] = (counts[job.level] ?? 0) + 1;
    if (job.salaryMax >= 40000000) {
      counts['salary-high'] = (counts['salary-high'] ?? 0) + 1;
    }
  });
  return counts;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aistarterkit.demo';
}

export function isJobExpired(deadline: string): boolean {
  return new Date(deadline) < new Date();
}
