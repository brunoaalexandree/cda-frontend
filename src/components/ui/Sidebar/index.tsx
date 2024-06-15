'use client';

import Image from 'next/image';
import { MainNavigation } from './main-navigation';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Button } from '../button';

export function Sidebar() {
  const { handleLogout, state } = useAuth();

  return (
    <Collapsible.Root className="fixed data-[state=open]:h-screen data-[state=open]:bottom-0 lg:data-[state=closed]:bottom-0 left-0 top-0 right-0 z-20 p-4 border-cda-yellow-400  bg-cda-blue-900 flex flex-col items-center lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:h-screen">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-between lg:justify-center ">
          <span></span>
          <Image src={'/alta.svg'} width={72} height={72} alt="Cidade Alta" />
          <Collapsible.Trigger asChild className="lg:hidden">
            <Button variant="ghost">
              <Menu className="w-6 h-6 text-cda-yellow-400" />
            </Button>
          </Collapsible.Trigger>
        </div>
      </div>

      <Collapsible.Content
        forceMount
        className="flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <MainNavigation />
        <div className="bottom-0 text-white border-t w-full flex items-center justify-between pt-8">
          <div className="flex gap-4">
            <img
              src="https://avatars.githubusercontent.com/u/3944953?v=4"
              alt="Bruno Alexandre"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-base">{state?.user?.name}</span>
              <span className="text-sm">{state?.user?.email}</span>
            </div>
          </div>
          <LogOut
            onClick={handleLogout}
            className="w-4 h-4 hover:cursor-pointer"
            color="white"
          />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
