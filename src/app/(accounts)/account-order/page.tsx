"use client";

import { useState } from "react";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image, { StaticImageData } from "next/image";
import OrderDetailsDialog from './orderDetailDialog';

interface OrderDetails {
  invoiceNumber: string;
  purchaseDate: string;
  products: {
    name: string;
    image: string | StaticImageData;
    quantity: number;
    price: number;
  }[];
  shipping: {
    courier: string;
    trackingNumber: string;
    address: string;
  };
  totalPrice: number;
}

const AccountOrder = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);

  const dummyOrderDetails: OrderDetails = {
    invoiceNumber: 'INV/20240819/MPL/4097099214',
    purchaseDate: '19 Agustus 2024, 11:23 WIB',
    products: [
      {
        name: 'CELANA PANJANG PUTIH CELANA PUTIH CHINO PANJANG CELANA PUTIH PRIA JUMBO - Abu-abu, 34',
        image: PRODUCTS[0].image,
        quantity: 1,
        price: 109900
      },
    ],
    shipping: {
      courier: 'GoSend Bike - Instant 3 Jam',
      trackingNumber: 'GK-11-778635498',
      address: 'Wildan, 628517227947, Pamulang 2 , Jalan benda barat 13 RT 04 RW 10 Blok D33 No22 Pamulang, Kota Tangerang Selatan, Banten 15416'
    },
    totalPrice: 300200
  };

  const openDialog = () => {
    setSelectedOrder(dummyOrderDetails);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const renderProductItem = (product: any, index: number) => {
    const { image, name } = product;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{"Natural"}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{"XL"}</span>
                </p>
              </div>
              <Prices className="mt-0.5 ml-2" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">1</span>
            </p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                Leave review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 mt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#WU3746HGG12</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>Aug 8, 2023</span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">Delivered</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
              onClick={openDialog}
            >
              Detail Pesanan
            </ButtonSecondary>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]].map(renderProductItem)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold">Histori Pemesanan</h2>
      {renderOrder()}
      <OrderDetailsDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        orderDetails={selectedOrder}
      />
    </div>
  );
};

export default AccountOrder;
