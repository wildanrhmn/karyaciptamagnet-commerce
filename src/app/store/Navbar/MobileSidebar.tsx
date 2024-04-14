"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { useSession } from "next-auth/react";
import { HeaderContext } from "@/context/NavbarContext";
import { useContext } from "react";
export default function MobileSidebar() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { isOpen } = useContext(HeaderContext);
  return (
    <div className={clsx("absolute h-[calc(100dvh)] flex z-20 w-full flex-auto flex-shrink-0 flex-col bg-white text-gray-800 antialiased", {
      "hidden": isOpen === false
    })}>
      <div className="flex flex-col border-r bg-white">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col space-y-1 py-4">
            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/store"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Toko
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/store/aboutus"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Tentang Kami
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/store/patnership"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Kerjasama
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/store/products"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Produk
                </span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Pengaturan
                </div>
              </div>
            </li>
            {session?.user && (
              <li>
                <Link
                  href={`/store/myaccount/${userId}/profile`}
                  className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Profile
                  </span>
                </Link>
              </li>
            )}
            {!session?.user && (
              <li>
                <Link
                  href="/auth/signin"
                  className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Login
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href="#"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Settings
                </span>
              </Link>
            </li>
            {session?.user && (
              <li>
                <Link
                  href="#"
                  className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Logout
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
