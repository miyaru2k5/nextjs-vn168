import type { JobPost } from '@/lib/careers/types';
import { formatSalary } from '@/lib/careers/utils';

type Props = {
  job: JobPost;
};

export function JobContent({ job }: Props) {
  return (
    <div className="space-y-10">
      <Section title="Mô tả công việc">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {job.description}
        </p>
      </Section>

      <Section title="Trách nhiệm chính">
        <ul className="space-y-3">
          {job.responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
              <span className="size-6 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Yêu cầu ứng viên">
        <ul className="space-y-3">
          {job.requirements.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Kỹ năng cần có">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Quyền lợi">
        <div className="grid sm:grid-cols-2 gap-4">
          {job.benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-500/10 dark:to-purple-500/10 border border-primary-100 dark:border-primary-500/20"
            >
              <span className="text-primary-500 shrink-0 mt-0.5">
                <StarIcon />
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Mức lương và chế độ đãi ngộ">
        <div className="p-5 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20">
          <p className="text-2xl font-bold text-primary-500 mb-2">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {job.salaryDetails}
          </p>
        </div>
      </Section>

      <div className="grid sm:grid-cols-2 gap-6">
        <Section title="Thời gian làm việc">
          <p className="text-gray-600 dark:text-gray-300">{job.workSchedule}</p>
        </Section>
        <Section title="Địa điểm làm việc">
          <p className="text-gray-600 dark:text-gray-300">{job.workLocation}</p>
        </Section>
      </div>

      <Section title="Quy trình tuyển dụng">
        <div className="relative">
          {job.hiringProcess.map((step, i) => (
            <div key={step.step} className="flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="size-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0 z-10">
                  {step.step}
                </div>
                {i < job.hiringProcess.length - 1 && (
                  <div className="w-0.5 flex-1 bg-primary-200 dark:bg-primary-700 mt-2" />
                )}
              </div>
              <div className="pt-1.5 pb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Thông tin công ty">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {job.companyInfo}
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-800 dark:text-white/90 mb-5">
        <span className="size-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500">
          <SectionIcon />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="size-5 text-primary-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function SectionIcon() {
  const className = 'size-5';
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}
