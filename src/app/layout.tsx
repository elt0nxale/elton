"use client";

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import "./globals.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ToggleSwitch from '@/components/ToggleSwitch';
import ClockWidget from '@/components/ClockWidget';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
          <div className="min-h-screen flex flex-col">
            <header className="w-full fixed bg-gray-100 dark:bg-gray-900 z-10">
              <div className="container mx-auto px-6 lg:px-8 max-w-3xl py-8 mt-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h1 className="text-2xl font-bold text-left">{currentPage}</h1>
                  <div className="flex items-center space-x-4">
                    <ClockWidget />
                    <ToggleSwitch isOn={theme === "dark"} handleToggle={toggleTheme} />
                  </div>              
                </div>
                <nav className="flex justify-end space-x-4 py-4 me-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="text-md font-semibold leading-6 hover:text-gray-600">
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <main className="flex-grow pt-24 container mx-auto px-6 lg:px-8 max-w-3xl">
              {children}
            </main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}