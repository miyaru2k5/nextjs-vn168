'use client';

import copy from 'copy-text-to-clipboard';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/use-click-outside';

type Props = {
  url: string;
  title: string;
  variant?: 'inline' | 'bottom-sheet';
  open?: boolean;
  onClose?: () => void;
};

const SHARE_LINKS = [
  {
    name: 'Facebook',
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Zalo',
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.74 1.47 5.18 3.76 6.77L5 22l4.72-2.36c.73.1 1.47.16 2.28.16 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
      </svg>
    ),
    getUrl: (url: string) =>
      `https://zalo.me/share?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
];

export function ShareMenu({ url, title, variant = 'inline', open, onClose }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const ref = useClickOutside<HTMLDivElement>(() => {
    setInternalOpen(false);
    onClose?.();
  });

  const handleCopy = useCallback(() => {
    copy(url);
    toast.success('Đã sao chép đường dẫn!');
    setInternalOpen(false);
    onClose?.();
  }, [url, onClose]);

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    setInternalOpen(false);
    onClose?.();
  };

  if (variant === 'bottom-sheet') {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => onClose?.()}
          />
        )}
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-dark-primary rounded-t-3xl p-6 transition-transform duration-300',
            isOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Chia sẻ bài viết
          </h3>
          <ShareOptions
            url={url}
            title={title}
            onShare={handleShare}
            onCopy={handleCopy}
          />
        </div>
      </>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setInternalOpen(!internalOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300 hover:text-primary-500 transition-all duration-200"
        aria-label="Chia sẻ bài viết"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" />
        </svg>
        Chia sẻ
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-dark-primary shadow-theme-lg border border-gray-100 dark:border-gray-800 p-2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          <ShareOptions
            url={url}
            title={title}
            onShare={handleShare}
            onCopy={handleCopy}
          />
        </div>
      )}
    </div>
  );
}

function ShareOptions({
  url,
  title,
  onShare,
  onCopy,
}: {
  url: string;
  title: string;
  onShare: (shareUrl: string) => void;
  onCopy: () => void;
}) {
  return (
    <div className="space-y-1">
      {SHARE_LINKS.map((link) => (
        <button
          key={link.name}
          onClick={() => onShare(link.getUrl(url, title))}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="text-primary-500">{link.icon}</span>
          {link.name}
        </button>
      ))}
      <button
        onClick={onCopy}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <svg className="size-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
        Sao chép đường dẫn
      </button>
    </div>
  );
}

export function ShareButton({ url, title }: { url: string; title: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <ShareMenu url={url} title={title} />
      </div>
      <button
        onClick={() => setSheetOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" />
        </svg>
        Chia sẻ
      </button>
      <ShareMenu
        url={url}
        title={title}
        variant="bottom-sheet"
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
