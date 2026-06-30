import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Onest } from 'next/font/google';
import './globals.css';
import { ToasterProvider } from './providers/toaster';
import { ensureDevSeedOnStart } from '@/lib/seed/ensure';

// Tự động xử lý seed khi chạy dev
// Hỗ trợ DATA_SOURCE=json | db | auto
if (process.env.NODE_ENV === 'development') {
  // fire-and-forget để không block render
  ensureDevSeedOnStart();
}

const onest = Onest({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Demo AIStarterKit OSS - Bộ khởi động AI Next.js',
    template: '%s | AIStarterKit OSS Demo',
  },
  description:
    'Trang demo của bộ khởi động AIStarterKit OSS. Xây dựng bằng Next.js, Tailwind CSS, Drizzle ORM và PostgreSQL.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`bg-gray-50 dark:bg-dark-secondary min-h-screen flex flex-col ${onest.className}`}
      >
        <ThemeProvider disableTransitionOnChange>
          {/* ToasterProvider must render before the children components */}
          {/* https://github.com/emilkowalski/sonner/issues/168#issuecomment-1773734618 */}
          <ToasterProvider />

          <div className="isolate flex flex-col flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
