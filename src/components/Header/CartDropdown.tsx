"use client";

import { Popover, Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { Fragment, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ICartData } from "../../../@types/definition";
import { RemoveFromCart } from "@/lib/action";
import toast from "react-hot-toast";

export default function CartDropdown() {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<ICartData | null>(null);
  const [loading, setLoading] = useState(true);

  console.info(session)

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchCartData();
    }
  }, [session]);

  const handleRemoveFromCart = async (cartItemId: string) => {
    const response = await RemoveFromCart(cartItemId);
    if (response.success) {
      toast.success(response.message);
      const updatedCartData = await axios.get("/api/cart");
      setCartData(updatedCartData.data);
    } else {
      toast.error("Error removing item from cart");
    }
  };

  const renderProduct = (item: any, index: number, close: () => void) => {
    const { product, quantity } = item;
    const { ProductImages, name, priceRange } = product;
  
    return (
      <div key={index} className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 dark:hover:bg-slate-800 duration-300">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-sm">
            <Image
              fill
              src={ProductImages[0]?.imageUrl}
              alt={name}
              className="object-cover"
            />
            <Link
              onClick={close}
              className="absolute inset-0 transition-opacity duration-300 hover:opacity-75"
              href={`/product/${product.slug}`}
            />
          </div>
  
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              <Link onClick={close} href={`/product/${product.slug}`} className="hover:underline">
                {name}
              </Link>
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Quantity: {quantity}
            </p>
            <div className="mt-2">
              <Prices price={priceRange} className="text-sm font-medium text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
  
        <div className="flex flex-col items-end space-y-2">
          <button
            type="button"
            className="text-xs font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full px-2 py-1"
            onClick={() => handleRemoveFromCart(item.cartItemId)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            {cartData && (
              <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                <span className="mt-[1px]">{cartData.items.length}</span>
              </div>
            )}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link className="block md:hidden absolute inset-0" href={"/cart"} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800">
                  {!session ? (
                    <div className="p-5 space-y-4 flex flex-col items-center justify-center text-center">
                      <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Masuk untuk Melihat Keranjang</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Silakan masuk untuk mulai berbelanja!</p>
                      <ButtonPrimary className="mt-4">
                        <Link href="/login">Masuk</Link>
                      </ButtonPrimary>
                    </div>
                  ) : loading ? (
                    <div className="p-5 space-y-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : !cartData || cartData.items.length === 0 ? (
                    <div className="p-5 flex flex-col items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Keranjang kosong</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Tambahkan beberapa item untuk memulai!</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                        <h3 className="text-xl font-semibold">Keranjang Belanja</h3>
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                          {cartData.items.map((item, index) =>
                            renderProduct(item, index, close)
                          )}
                        </div>
                      </div>
                      <div className="bg-neutral-50 dark:bg-slate-900 p-3">
                        <div className="flex space-x-2">
                          <ButtonSecondary
                            href="/cart"
                            className="flex-1 border border-slate-200 dark:border-slate-700 text-[14px]"
                            onClick={close}
                          >
                            Lihat Keranjang
                          </ButtonSecondary>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
