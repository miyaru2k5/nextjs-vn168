export type JobType = 'full-time' | 'part-time' | 'intern' | 'remote';

export type JobDepartment =
  | 'engineering'
  | 'product'
  | 'marketing'
  | 'sales'
  | 'hr'
  | 'design';

export type JobLevel = 'junior' | 'mid' | 'senior' | 'lead' | 'manager';

export type JobTypeFilter = JobType | 'all';

export type JobFilter =
  | 'all'
  | JobType
  | JobDepartment
  | JobLevel
  | 'salary-high'
  | 'salary-mid';

export type JobPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  department: JobDepartment;
  location: string;
  jobType: JobType;
  level: JobLevel;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  experience: string;
  headcount: number;
  publishedAt: string;
  deadline: string;
  views: number;
  likes: number;
  featured: boolean;
  companyLogo: string;
  coverImage: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  salaryDetails: string;
  workSchedule: string;
  workLocation: string;
  hiringProcess: { step: number; title: string; description: string }[];
  companyInfo: string;
};

export type JobComment = {
  id: string;
  jobId: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isOwner?: boolean;
  replies?: JobComment[];
};

export type JobSearchParams = {
  title: string;
  skill: string;
  department: string;
  location: string;
};

export const JOB_DEPARTMENTS: Record<
  JobDepartment,
  { label: string; slug: JobDepartment }
> = {
  engineering: { label: 'Kỹ thuật', slug: 'engineering' },
  product: { label: 'Sản phẩm', slug: 'product' },
  marketing: { label: 'Marketing', slug: 'marketing' },
  sales: { label: 'Kinh doanh', slug: 'sales' },
  hr: { label: 'Nhân sự', slug: 'hr' },
  design: { label: 'Thiết kế', slug: 'design' },
};

export const JOB_TYPES: Record<JobType, { label: string }> = {
  'full-time': { label: 'Toàn thời gian' },
  'part-time': { label: 'Bán thời gian' },
  intern: { label: 'Thực tập sinh' },
  remote: { label: 'Remote' },
};

export const JOB_LEVELS: Record<JobLevel, { label: string }> = {
  junior: { label: 'Junior' },
  mid: { label: 'Mid-level' },
  senior: { label: 'Senior' },
  lead: { label: 'Lead' },
  manager: { label: 'Manager' },
};

export const JOB_FILTERS: { value: JobFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả vị trí' },
  { value: 'full-time', label: 'Toàn thời gian' },
  { value: 'part-time', label: 'Bán thời gian' },
  { value: 'intern', label: 'Thực tập sinh' },
  { value: 'remote', label: 'Remote' },
  { value: 'engineering', label: 'Kỹ thuật' },
  { value: 'product', label: 'Sản phẩm' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Thiết kế' },
  { value: 'senior', label: 'Senior' },
  { value: 'salary-high', label: 'Lương cao' },
];

export const POPULAR_SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'AI/ML',
  'Figma',
  'Product Management',
  'SEO',
  'DevOps',
];

export const POPULAR_INDUSTRIES = [
  'Công nghệ thông tin',
  'Trí tuệ nhân tạo',
  'SaaS',
  'Fintech',
  'E-commerce',
];
