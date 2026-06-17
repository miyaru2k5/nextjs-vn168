export function CareersCardSkeleton() {
  return (
    <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="size-12 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CareersListingSkeleton() {
  return (
    <section className="pb-20">
      <div className="wrapper">
        <div className="mb-8">
          <div className="h-24 rounded-[20px] bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="flex gap-2 mb-8 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-28 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0"
            />
          ))}
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CareersCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
