"use client";

import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import LayoutContent from '@/components/LayoutContent';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${inter.className}`}>
          <LayoutContent>{children}</LayoutContent>
          <Analytics/>
          <SpeedInsights />
        </body>
      </ThemeProvider>
    </html>
  );
}