import Link from 'next/link';
import { ElementType } from 'react';

export interface NavItemProps {
  title: string;
  icon: ElementType;
  href: string;
}

export function NavItem({ title, icon: Icon, href }: NavItemProps) {
  return (
    <Link href={href} className="group flex items-center gap-3 px-3 py-2">
      <Icon className="h-5 w-5 text-cda-yellow-400" />
      <span className="font-medium text-white group-hover:text-cda-yellow-400">
        {title}
      </span>
    </Link>
  );
}
