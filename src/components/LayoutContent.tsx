'use client';

import Header from "./Header";
import Footer from "./Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow mt-4 pt-24">
          {children}
      </main>
      <Footer/>
    </div>
  );
}