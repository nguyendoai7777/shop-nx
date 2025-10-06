'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ButtonBase } from '@mui/material';
import './navlink.scss';

export interface NavlinkProps {
  href: string;
  className?: string;
  routerLinkActive?: string;
}

export const Navlink: FCC<NavlinkProps> = ({ href, children, className, routerLinkActive }) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <ButtonBase
      className={`BaseNavLink ${isActive ? `${routerLinkActive ? routerLinkActive : 'activated'}` : ''} ${className ? className : ''}`}
      component={Link}
      href={href}
    >
      {children}
    </ButtonBase>
  );
};
