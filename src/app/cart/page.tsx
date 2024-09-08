"use client";

import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICartData } from "../../../@types/definition";
import { RemoveFromCart } from "@/lib/action";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";

const CartPage = () => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<ICartData | null>(null);
  const [loading, setLoading] = useState(true);

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

  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Habis Terjual</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Tersedia</span>
      </div>
    );
  };

  const renderProduct = (item: any, index: number) => {
    const { product, quantity, customization } = item;
    const { ProductImages, name, stock } = product;

    const handleRemoveFromCart = async (cartItemId: string) => {
      const response = await RemoveFromCart(cartItemId);
      if (response.success) {
        toast.custom(
          (t) => (
            <Transition
              appear
              show={t.visible}
              className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
              enter="transition-all duration-150"
              enterFrom="opacity-0 translate-x-20"
              enterTo="opacity-100 translate-x-0"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-20"
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="block text-sm font-semibold leading-none">
                  {response.message}
                </p>
              </div>
            </Transition>
          ),
          {
            position: "top-right",
            id: `cart-${item.cartItemId}`,
            duration: 3000,
          }
        );
      } else {
        console.error("Error removing item from cart:", response.message);
      }
    };

    return (
      <div
        key={index}
        className="flex flex-col sm:flex-row items-start gap-4 py-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
      >
        {/* Product Image */}
        <div className="relative w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={ProductImages[0]?.imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-contain"
          />
          <Link
            href={`/product/${product.slug}`}
            className="absolute inset-0"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">
                <Link href={`/product/${product.slug}`}>{name}</Link>
              </h3>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {product.productCategory.name} •{" "}
                {product.productSubCategory.name}
              </div>
            </div>
            <Prices
              price={product.priceRange}
              className="text-lg font-medium"
            />
          </div>

          {/* Customization */}
          {customization && (
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Kustomisasi:</span> {customization}
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NcInputNumber defaultValue={quantity} className="w-24" />
              {stock > 0 ? renderStatusInstock() : renderStatusSoldout()}
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.cartItemId)}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="nc-CartPage animate-pulse">
        <main className="container py-16 lg:pb-28 lg:pt-20">
          <div className="mb-12 sm:mb-16">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center">
                <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded"></div>
                <div className="flex-grow sm:ml-8 mt-4 sm:mt-0">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-10">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <svg
          className="w-24 h-24 text-gray-400 mb-4"
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
        <h2 className="text-2xl font-semibold mb-2">Keranjang Anda Kosong</h2>
        <p className="text-gray-600 mb-4">
          Sepertinya Anda belum menambahkan apapun ke keranjang.
        </p>
        <Link href="/collection" className="text-blue-600 hover:underline">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Keranjang Belanja
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Beranda
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link href={"/collection"} className="">
              Kategori Produk
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Keranjang Belanja</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700">
            {cartData.items.map(renderProduct)}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>Total Item</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {cartData.items.length}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Item Dengan Harga Final</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {cartData.itemsWithFinalPrice} / {cartData.items.length}
                  </span>
                </div>
                {cartData.allItemsPriced && (
                  <>
                    <div className="flex justify-between py-4">
                      <span>Total Harga</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        Rp{cartData.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span>Estimasi pengiriman</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        Akan dihitung
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Status</span>
                  <span>
                    {cartData.allItemsPriced
                      ? "Siap Checkout"
                      : "Menunggu Harga Final"}
                  </span>
                </div>
              </div>
              <ButtonPrimary
                className={`mt-8 w-full ${
                  cartData.status !== "pending_submission" &&
                  cartData.status !== "priced" &&
                  "opacity-50 cursor-not-allowed"
                }`}
                disabled={
                  cartData.status !== "pending_submission" &&
                  cartData.status !== "priced"
                }
              >
                {cartData.status === "pending_submission"
                  ? "Ajukan untuk Penentuan Harga"
                  : cartData.status === "priced"
                  ? "Bayar Sekarang"
                  : "Menunggu Penentuan Harga"}
              </ButtonPrimary>
              {cartData.status === "submitted_submission" && (
                <p className="mt-2 text-sm text-center text-slate-500 dark:text-slate-400">
                  Mohon tunggu admin menentukan harga final untuk semua item
                </p>
              )}
              {cartData.status === "priced" && (
                <p className="mt-2 text-sm text-center text-slate-500 dark:text-slate-400">
                  Harga final telah ditentukan. Silakan lanjutkan ke pembayaran.
                </p>
              )}
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <p className="block relative pl-5">
                  <svg
                    className="w-4 h-4 absolute -left-1 top-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9945 16H12.0035"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Pelajari lebih lanjut tentang proses{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    pemesanan kustom
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
