'use client';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function BlogSearch({ value, onChange }: Props) {
  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm bài viết..."
        className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-primary text-sm text-gray-800 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-one focus:border-primary-300 focus:outline-none focus:ring-3 focus:ring-primary-300/20 dark:focus:border-primary-500 transition-all duration-200"
      />
    </div>
  );
}
