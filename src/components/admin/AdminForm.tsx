'use client';

import { cn } from '@/lib/utils';
import { InputGroup } from '@/components/ui/inputs';
import { Textarea } from '@/components/ui/inputs/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/inputs/checkbox';

type AdminFormProps = {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
};

export function AdminForm({ children, onSubmit, className }: AdminFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className={cn('space-y-6', className)}
    >
      {children}
    </form>
  );
}

export function AdminFormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-dark-primary rounded-2xl border border-gray-100 dark:border-gray-800 p-5 md:p-6 shadow-theme-xs">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

export function AdminSelect({
  label,
  name,
  options,
  defaultValue,
  error,
  className,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 h-12 w-full rounded-full border border-gray-300 px-5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90 dark:bg-dark-primary focus:border-primary-300 focus:outline-none focus:ring-3 focus:ring-primary-300/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
}

export function AdminTextarea({ label, name, rows = 4, defaultValue, className }: { label: string; name: string; rows?: number; defaultValue?: string; className?: string }) {
  return (
    <div className={cn('md:col-span-2', className)}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} rows={rows} defaultValue={defaultValue} className="mt-1.5" />
    </div>
  );
}

export function AdminFormActions({ cancelHref, submitLabel = 'Lưu' }: { cancelHref: string; submitLabel?: string }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
      <a
        href={cancelHref}
        className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition min-h-[44px]"
      >
        Hủy
      </a>
      <button
        type="submit"
        className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition shadow-theme-xs min-h-[44px]"
      >
        {submitLabel}
      </button>
    </div>
  );
}

export { InputGroup, Checkbox };
