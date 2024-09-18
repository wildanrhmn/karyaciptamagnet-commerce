'use client';

import {
  ArrowTopRightOnSquareIcon,
  ShoppingCartIcon,
  NewspaperIcon,
  CogIcon,
  TruckIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'E-Commerce', href: '/', icon: ShoppingCartIcon },
  { name: 'Overview', href: '/dashboard/overview', icon: ArrowTopRightOnSquareIcon },
  { name: 'Submissions', href: '/dashboard/submissions', icon: NewspaperIcon },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBagIcon },
  { name: 'Production', href: '/dashboard/production', icon: CogIcon },
  { name: 'Shippings', href: '/dashboard/shippings', icon: TruckIcon },
  { name: 'Inventory', href: '/dashboard/inventory', icon: ArchiveBoxIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href as any}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
