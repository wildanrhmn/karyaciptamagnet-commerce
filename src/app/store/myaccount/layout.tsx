"use client";

import Link from "next/link";
import clsx from "clsx";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession().data;
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-5 rounded-xl bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
      <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
        <div className="sticky top-12 flex flex-col gap-2 border-r border-indigo-100 p-4 text-sm">
          <h2 className="mb-4 pl-3 text-2xl font-semibold">Pengaturan</h2>

          <Link
            href={`/store/myaccount/${session?.user?.id}/profile`}
            className={clsx(
              "flex items-center rounded-full border bg-white px-3 py-2.5 font-bold text-black",
              {
                "bg-[#3c97d1] text-white":
                  pathname === `/store/myaccount/${session?.user?.id}/profile`,
              }
            )}
          >
            Biodata
          </Link>
          <Link
            href={`/store/myaccount/${session?.user?.id}/addresses`}
            className={clsx(
              "flex items-center rounded-full border bg-white px-3 py-2.5 font-bold text-black",
              {
                "bg-[#3c97d1] text-white":
                  pathname === `/store/myaccount/${session?.user?.id}/addresses`,
              }
            )}
          >
            Daftar Alamat
          </Link>
        </div>
      </aside>
      {children}
    </div>
  );
}
