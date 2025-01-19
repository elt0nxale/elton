interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 text-left">
      {children}
    </div>
  );
}