import Link from 'next/link';

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  children?: React.ReactNode;
};

export default function AdminPageHeader({ title, description, action, children }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition shadow-theme-xs min-w-[44px]"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
