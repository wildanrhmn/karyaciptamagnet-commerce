"use client";

import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        {user ? (
          <Image
            src={user?.image.url || profilePicPlaceholder}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 shadow"
      >
        {user ? (
          <>
            <li className="flex">
              <Link href={`/store/myaccount/${user.id}/profile`} className="py-3">
                <Icon icon="iconamoon:profile-fill" className="h-5 w-5" />
                Akun
              </Link>
            </li>
            <hr className="my-3" />
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/store" })}
                className="py-3"
              >
                <Icon icon="uil:signout" className="h-5 w-5" />
                Keluar
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/auth/signin"} className="py-3">
                <Icon icon="material-symbols:login" className="h-6 w-6" />
                Masuk
              </Link>
            </li>
            <hr className="my-3" />
            <li>
              <Link href={"/auth/signup"} className="py-3">
                <Icon icon="mdi:register" className="h-6 w-6" />
                Daftar
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
