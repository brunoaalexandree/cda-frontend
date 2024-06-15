import { BadgeHelp, Home } from 'lucide-react';
import { NavItem } from './nav-item';

export function MainNavigation() {
  return (
    <nav className=" w-full mt-8 space-y-0.5">
      <NavItem title="Início" icon={Home} href="/" />
      <NavItem title="Emblemas" icon={BadgeHelp} href="/emblems" />
    </nav>
  );
}
