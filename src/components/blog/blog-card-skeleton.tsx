export function BlogCardSkeleton() {
  return (
    <div className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogListingSkeleton() {
  return (
    <section className="pb-20">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
