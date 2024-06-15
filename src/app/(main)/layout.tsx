import { Sidebar } from '@/components/ui/Sidebar';
import Image from 'next/image';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-app">
      <Sidebar />
      <main className="px-4 pb-12 pt-24 lg:col-start-2 lg:px-4 lg:pb-12 lg:pt-8 bg-cda-blue-900">
        {children}
      </main>
    </div>
  );
}
