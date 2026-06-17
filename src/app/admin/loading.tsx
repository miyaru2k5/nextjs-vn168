import { CardSkeleton } from '@/components/admin/EmptyState';

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-white/5 rounded-lg w-48" />
      <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-72" />
      <CardSkeleton count={6} />
      <div className="h-80 bg-gray-100 dark:bg-white/5 rounded-2xl" />
    </div>
  );
}
