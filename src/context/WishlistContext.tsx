"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";

interface WishlistContextType {
  isLiked: (productId: string) => boolean;
  toggleLike: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      fetchWishlist();
    }
  }, [session]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("/api/wishlist");
      setLikedProducts(
        new Set(response.data.map((item: any) => item.productId))
      );
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const isLiked = (productId: string) => likedProducts.has(productId);

  const toggleLike = async (productId: string) => {
    try {
      const response = await axios.post(
        `/api/products/${productId}/toggle-wishlist`,
        {
          userId: session?.user?.id,
        }
      );
      if (response.data.action === "added") {
        setLikedProducts((prev) => new Set(prev).add(productId));
      } else {
        setLikedProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }

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
                {response.data.action === "added"
                  ? "Berhasil menambahkan ke wishlist!"
                  : "Berhasil menghapus dari wishlist!"}
              </p>
            </div>
          </Transition>
        ),
        {
          position: "top-right",
          id: `wishlist-${productId}`,
          duration: 3000,
        }
      );
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Gagal memperbarui wishlist");
    }
  };

  return (
    <WishlistContext.Provider value={{ isLiked, toggleLike }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
