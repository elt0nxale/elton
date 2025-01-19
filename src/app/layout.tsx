"use client";

import { Inter } from 'next/font/google';
import "./globals.css";
import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import LayoutContent from '@/components/LayoutContent';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const formatPageName = (path: string) => {
    return path
      .substring(path.lastIndexOf('/') + 1)
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currentPage = pathname ? formatPageName(pathname) : '';

  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${inter.className}`}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </ThemeProvider>
    </html>
  );
}