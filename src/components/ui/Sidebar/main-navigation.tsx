import { BadgeHelp, Home, User } from 'lucide-react';
import { NavItem } from './nav-item';

export function MainNavigation() {
  return (
    <nav className="w-full mt-8">
      <NavItem title="Início" icon={Home} href="/" />
      <NavItem title="Emblemas" icon={BadgeHelp} href="/emblems" />
      <NavItem title="Perfil" icon={User} href="/edit-profile" />
    </nav>
  );
}
