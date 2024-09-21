"use client";

import React, { FC, useState } from "react";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ModalEdit from "@/components/ModalEdit";
import { EditIcon, TrashIcon } from "lucide-react";
import ProductStatus from "@/components/ProductStatus";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";

export interface ProductCardProps {
  className?: string;
  product: any;
}

const ProductCard: FC<ProductCardProps> = ({ className, product }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const renderGroupButtons = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-black bg-opacity-50">
        <ButtonPrimary
          className="shadow-lg mr-2"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalEdit(true)}
        >
          <EditIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Edit</span>
        </ButtonPrimary>

        <ButtonSecondary
          className="bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Delete</span>
        </ButtonSecondary>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col dark:border-gray-700 rounded-lg shadow-md hover:shadow-md transition-shadow ${className}`}
      >
        <Link
          href={`/product/${product?.slug}`}
          className="absolute inset-0"
        ></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-lg overflow-hidden z-1 group">
          <Link href={`/product/${product?.slug}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={product?.ProductImages[0].imageUrl}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt={product?.name}
            />
          </Link>
          <ProductStatus stock={product.stock} />
          {renderGroupButtons()}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-2 rounded-md shadow-md">
            <Prices price={product?.priceRange} />
          </div>
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-5">
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {product?.name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1`}>
              {product?.productCategory.name}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Stock:</span> {product?.stock}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Weight:</span> {product?.weight}g
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Order Count:</span> {product?.orderCount}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Created:</span> {new Date(product?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <ModalEdit
          show={showModalEdit}
          onCloseModalEdit={() => setShowModalEdit(false)}
        />
      </div>
    </>
  );
};

export default ProductCard;
