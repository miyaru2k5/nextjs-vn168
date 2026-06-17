'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSearchItems } from '@/lib/admin/navigation';
import { AdminSearchIcon } from '@/icons/admin-icons';

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const items = getSearchItems();

  const filtered = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  const navigate = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-10 px-4 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-sm text-gray-500 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-500 transition min-w-[240px] lg:min-w-[320px]"
      >
        <AdminSearchIcon size={18} />
        <span className="flex-1 text-left">Tìm kiếm...</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-400">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
        aria-label="Tìm kiếm"
      >
        <AdminSearchIcon size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-dark-primary rounded-2xl shadow-theme-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
              <AdminSearchIcon size={20} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm trang, module..."
                className="flex-1 h-12 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
              />
              <kbd className="text-xs text-gray-400 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">Không tìm thấy kết quả</p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.href)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.group}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
