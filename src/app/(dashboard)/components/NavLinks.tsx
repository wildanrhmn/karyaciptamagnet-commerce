"use client";

import {
  ArrowTopRightOnSquareIcon,
  ShoppingCartIcon,
  NewspaperIcon,
  CogIcon,
  TruckIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "E-Commerce",
    href: "/",
    icon: ShoppingCartIcon,
    scopes: [
      "administrator",
      "manager",
      "productionStaff",
      "warehouseStaff",
      "logisticStaff",
    ],
  },
  {
    name: "Overview",
    href: "/dashboard/overview",
    icon: ArrowTopRightOnSquareIcon,
    scopes: [
      "administrator",
      "manager",
      "productionStaff",
      "warehouseStaff",
      "logisticStaff",
    ],
  },
  {
    name: "Pesanan",
    href: "/dashboard/orders",
    icon: ShoppingBagIcon,
    scopes: ["administrator", "manager", "productionStaff"],
  },
  {
    name: "Pengajuan",
    href: "/dashboard/submissions",
    icon: NewspaperIcon,
    scopes: ["administrator", "manager"],
  },
  {
    name: "Produksi",
    href: "/dashboard/production",
    icon: CogIcon,
    scopes: ["administrator", "productionStaff"],
  },
  {
    name: "Pengiriman",
    href: "/dashboard/shippings",
    icon: TruckIcon,
    scopes: ["administrator", "logisticStaff"],
  },
  {
    name: "Inventaris",
    href: "/dashboard/inventory",
    icon: ArchiveBoxIcon,
    scopes: ["administrator", "warehouseStaff"],
  },
  {
    name: "Manajemen Pengguna",
    href: "/dashboard/users",
    icon: UserGroupIcon,
    scopes: ["administrator"],
  },
  {
    name: "Laporan",
    href: "/dashboard/reports",
    icon: ChartBarIcon,
    scopes: ["administrator", "manager"],
  },
];

export default function NavLinks({ userScope }: { userScope: string }) {
  const pathname = usePathname();

  return (
    <>
      {links
        .filter((link) => link.scopes.includes(userScope))
        .map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href as any}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
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
