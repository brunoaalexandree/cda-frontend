'use client';

import { Sidebar } from '@/components/ui/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { ModalProvider } from '@/providers/modal-provider';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!state.user && pathname !== '/sign-up') {
    router.push('/sign-in');
  } else {
    return (
      <div className="grid min-h-screen lg:grid-cols-app">
        <Sidebar />
        <main className="w-full px-4 pb-12 pt-24 lg:col-start-2 lg:px-4 lg:pb-12 lg:pt-8 bg-cda-blue-900">
          {children}
        </main>
      </div>
    );
  }
}
