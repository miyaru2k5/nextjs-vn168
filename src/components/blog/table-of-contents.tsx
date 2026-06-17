'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/blog/types';

type Props = {
  items: TocItem[];
};

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="rounded-[20px] bg-white dark:bg-dark-primary shadow-one border border-gray-100 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-4 uppercase tracking-wide">
        Mục lục
      </h3>
      <ul className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1.5 text-sm transition-colors duration-200 border-l-2',
                item.level === 3 ? 'pl-6' : 'pl-3',
                activeId === item.id
                  ? 'border-primary-500 text-primary-500 font-medium'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:border-primary-300'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
