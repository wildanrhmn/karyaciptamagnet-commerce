"use client";

import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalViewAllReviews from "./ModalViewAllReviews";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import axios from "axios";
import { AddToCart } from "@/lib/action";
import { useSession } from "next-auth/react";
import { Transition } from "@/app/headlessui";
import { useRouter } from "next/navigation";

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const [productDetail, setProductDetail] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState("");
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/api/product/${params.slug}`);
        setProductDetail(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [params.slug]);

  const notifyAddTocart = async () => {
    if (!session?.user) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }

    const result = await AddToCart(productDetail.productId, session.user.id, quantity, customization);

    if (result.success) {
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
            <p className="block text-base font-semibold leading-none">
              {result.message}
            </p>
            <div className="border-t border-slate-2000 dark:border-slate-7000 my-4" />
            {renderProductCartOnNotify({ product: productDetail })}
          </Transition>
        ),
        {
          position: "top-right",
          id: String(productDetail?.productId) || "product-detail",
          duration: 3000,
        }
      );
    } else {
      toast.error(result.message);
    }
  };

  const renderProductCartOnNotify = ({ product }: { product: any }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={product?.ProductImages[0].imageUrl}
            alt={product?.name}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{product?.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-4000">
                  <span>{product?.productCategory.name}</span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{product?.productSubCategory.name}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty {quantity}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                Lihat Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (productDetail?.stock > 0) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{`Stok Tersedia`}</span>
        </div>
      );
    }
    if (productDetail?.stock === 0) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{`Stok Habis`}</span>
        </div>
      );
    }
    return null;
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              {productDetail?.name}
            </h2>
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={productDetail?.priceRange}
            />
          </div>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <div className="flex justify-start rtl:justify-end items-center space-x-4 sm:space-x-5 rtl:space-x-reverse">
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span>{productDetail?.productCategory.name}</span>
                <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                <span>{productDetail?.productSubCategory.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Customization Text Field ---------- */}
        <div className="space-y-2">
          <label htmlFor="customization" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Kustomisasi Produk
          </label>
          <textarea
            id="customization"
            name="customization"
            rows={3}
            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:focus:border-blue-600"
            placeholder="Masukan permintaan kustomisasi disini..."
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tambahkan instruksi khusus atau permintaan kustomisasi untuk produk ini.
          </p>
        </div>


        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={quantity}
              onChange={setQuantity}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Tambahkan ke Keranjang</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo
          name="Deskripsi Produk"
          content={productDetail?.smallDescription}
        />

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Detail Produk</h2>
        <div
          className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7"
          dangerouslySetInnerHTML={{ __html: productDetail?.description }}
        ></div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> {productDetail?.productReviews.length} Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            {productDetail?.productReviews.slice(0, 3).map((item: any) => (
              <ReviewItem key={item.productReviewId} data={item} />
            ))}
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Cari semua {productDetail?.productReviews.length} reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="nc-ProductDetailPage container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%]">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative bg-gray-200 animate-pulse rounded-2xl"></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[1, 2].map((item, index) => (
                <div
                  key={index}
                  className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative bg-gray-200 animate-pulse rounded-2xl"
                ></div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            <div className="space-y-7 2xl:space-y-8">
              <div className="flex flex-col gap-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="flex space-x-3.5">
                <div className="h-12 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-40 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="h-60 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-80 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  src={productDetail?.ProductImages[0]?.imageUrl}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>
              {renderStatus()}
              {/* META FAVORITES */}
              <LikeButton
                className="absolute right-3 top-3 "
                productId={productDetail?.productId}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[
                productDetail?.ProductImages[1],
                productDetail?.ProductImages[2],
              ].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                    <Image
                      sizes="(max-width: 640px) 100vw, 33vw"
                      fill
                      src={item?.imageUrl}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <div className="pb-20">
            <SectionSliderProductCard
              heading="Produk Yang Mungkin Anda Sukai"
              subHeading=""
              headingFontClassName="text-2xl font-semibold"
              headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            />
          </div>
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        productReviews={productDetail?.productReviews}
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
