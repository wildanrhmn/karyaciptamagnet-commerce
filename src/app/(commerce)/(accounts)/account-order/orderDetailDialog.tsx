import React from "react";
import Image from "next/image";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { StaticImageData } from "next/image";

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: any;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen || !orderDetails) return null;

  function handleShippingStatus(status: string) {
    switch (status) {
      case "PENDING":
        return "Menunggu Konfirmasi";
      case "CONFIRMED":
        return "Dikonfirmasi";
      case "SHIPPING":
        return "Dikirim";
      case "DELIVERED":
        return "Diterima";
      case "CANCELLED":
        return "Dibatalkan";
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Detail Transaksi
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg mb-6">
          <p className="mb-2">
            <span className="font-semibold">No. Order:</span>{" "}
            <span className="text-blue-600">#{orderDetails.orderId}</span>
          </p>
          <p>
            <span className="font-semibold">Tanggal Pembelian:</span>{" "}
            <span className="text-green-600">
              {new Date(orderDetails.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Detail Produk</h3>
          {orderDetails.cart.items.map((item: any, index: any) => (
            <div
              key={index}
              className="flex items-center mb-4 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg"
            >
              <Image
                src={item.product.ProductImages[0].imageUrl}
                alt={item.product.name}
                width={60}
                height={60}
                className="rounded-md mr-4"
              />
              <div>
                <p className="font-medium text-sm">{item.product.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.quantity} Qty x{" "}
                  <span className="text-green-600">
                    Rp. {item.finalPrice ? item.finalPrice : item.product.priceRange}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold mb-3">Info Pengiriman</h3>

        <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg mb-6">
          <p className="mb-2">
            <span className="font-medium">Status Pengiriman:</span>{" "}
            {handleShippingStatus(orderDetails.shippingStatus)}
          </p>
          <p>
            <span className="font-medium">Alamat:</span>{" "}
            {orderDetails.shippingAddress ? orderDetails.shippingAddress : "Tidak ada alamat pengiriman"}
          </p>
        </div>

        <div className="bg-gray-200 dark:bg-slate-600 p-4 rounded-lg text-right">
          <p className="text-xl font-bold">
            Total:{" "}
            <span className="text-green-600">
              Rp. {orderDetails.totalPrice.toLocaleString()}
            </span>
          </p>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <ButtonSecondary onClick={onClose} className="px-6 py-3 text-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300">
            Tutup
          </ButtonSecondary>
          <ButtonPrimary className="px-6 py-3 text-lg text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:bg-primary-600">
            Bayar Sekarang
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsDialog;
