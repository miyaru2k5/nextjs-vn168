type Props = {
  content: string;
};

export function ArticleContent({ content }: Props) {
  return (
    <article
      className="blog-prose prose prose-lg dark:prose-invert max-w-none
        prose-headings:text-gray-800 dark:prose-headings:text-white/90
        prose-headings:font-semibold
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
        prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-500/10 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic
        prose-code:text-primary-600 dark:prose-code:text-primary-300 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:rounded-2xl prose-pre:shadow-theme-sm
        prose-img:rounded-2xl prose-img:shadow-theme-sm
        prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-400
        prose-table:overflow-hidden prose-th:bg-gray-50 dark:prose-th:bg-gray-800
        prose-li:text-gray-600 dark:prose-li:text-gray-300"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
