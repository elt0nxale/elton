'use client';

import Header from "./Header";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow pt-24">
          {children}
      </main>
    </div>
  );
}