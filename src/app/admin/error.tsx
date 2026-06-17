'use client';

import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="size-16 rounded-2xl bg-error-50 dark:bg-error-500/10 flex items-center justify-center text-error-500 mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 11V17M16 21H16.01M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Đã xảy ra lỗi</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        {error.message || 'Không thể tải trang. Vui lòng thử lại.'}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition"
        >
          Thử lại
        </button>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition"
        >
          Về Dashboard
        </Link>
      </div>
    </div>
  );
}
