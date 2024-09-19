"use client";

import React, { useState } from "react";
import Image from "next/image";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Script from "next/script";

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: any;
}

declare global {
  interface Window {
    snap: any;
  }
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  function formatStatus(status: string) {
    switch (status) {
      case "AWAITING_PRICE":
        return "Menunggu Harga";
      case "AWAITING_PAYMENT":
        return "Menunggu Bayar";
      case "PAID":
        return "Dibayar";
      case "PRODUCTION_IN_PROGRESS":
        return "Produksi";
      case "ON_DELIVERY":
        return "Dikirim";
      case "DELIVERED":
        return "Diterima";
    }
  }

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/order/${orderDetails.orderId}/pay`, {
        method: "POST",
      });
      const data = await response.json();
      const { paymentToken } = data;

      window.snap.pay(paymentToken, {
        onSuccess: function (result: any) {
          console.log("Payment success:", result);
          onClose();
        },
        onPending: function (result: any) {
          console.log("Payment pending:", result);
        },
        onError: function (result: any) {
          console.log("Payment error:", result);
        },
        onClose: function () {
          console.log(
            "Customer closed the popup without finishing the payment"
          );
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      setIsLoading(false);
    }
  };

  if (!isOpen || !orderDetails) return null;

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Detail Transaksi
            </h2>
            <button
              onClick={onClose}
              className="text-xl sm:text-2xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-semibold">No. Order:</span>{" "}
              <span className="text-blue-600">#{orderDetails.orderId}</span>
            </p>
            <p className="text-sm sm:text-base">
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

          <div className="mb-4 sm:mb-6">
            <h3 className="font-semibold mb-3 text-sm sm:text-base">
              Detail Produk
            </h3>
            {orderDetails.cart.items.map((item: any, index: any) => (
              <div
                key={index}
                className="flex items-center mb-3 sm:mb-4 bg-gray-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg"
              >
                <Image
                  src={item.product.ProductImages[0].imageUrl}
                  alt={item.product.name}
                  width={50}
                  height={50}
                  className="rounded-md mr-3 sm:mr-4"
                />
                <div>
                  <p className="font-medium text-xs sm:text-sm">
                    {item.product.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.quantity} Qty x{" "}
                    <span className="text-green-600">
                      Rp.{" "}
                      {item.finalPrice
                        ? item.finalPrice.toLocaleString()
                        : item.product.priceRange}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="font-semibold mb-3 text-sm sm:text-base">
            Status Pesanan
          </h3>
          <div className="flex items-center justify-between mb-4 sm:mb-6 relative">
            <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-300" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  ([
                    "AWAITING_PRICE",
                    "AWAITING_PAYMENT",
                    "PAID",
                    "PRODUCTION_IN_PROGRESS",
                    "ON_DELIVERY",
                    "DELIVERED",
                  ].indexOf(orderDetails.status) /
                    5) *
                  100
                }%`,
              }}
            />
            {[
              "AWAITING_PRICE",
              "AWAITING_PAYMENT",
              "PAID",
              "PRODUCTION_IN_PROGRESS",
              "ON_DELIVERY",
              "DELIVERED",
            ].map((status, index) => (
              <div
                key={status}
                className="flex flex-col items-center z-10 w-1/6"
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    orderDetails.status === status
                      ? "bg-green-500 text-white"
                      : index <=
                        [
                          "AWAITING_PRICE",
                          "AWAITING_PAYMENT",
                          "PAID",
                          "PRODUCTION_IN_PROGRESS",
                          "ON_DELIVERY",
                          "DELIVERED",
                        ].indexOf(orderDetails.status)
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  <span className="text-xs sm:text-sm">{index + 1}</span>
                </div>
                <div
                  className={`text-[10px] sm:text-xs mt-1 sm:mt-2 text-center ${
                    orderDetails.status === status ? "font-bold" : ""
                  }`}
                >
                  {formatStatus(status)}
                </div>
              </div>
            ))}
          </div>

          {orderDetails.status === "AWAITING_PRICE" && (
            <>
              <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                Menunggu Konfirmasi Harga
              </h3>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-[14px]">
                  Pesanan Anda sedang dalam proses konfirmasi harga. Kami akan segera menghubungi Anda untuk memberikan informasi harga final.
                </p>
                <p className="text-sm sm:text-[14px]">
                  <span className="font-medium">Estimasi waktu:</span> 1-2 hari kerja
                </p>
              </div>
            </>
          )}

          {orderDetails.status === "AWAITING_PAYMENT" && (
            <>
              <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                Menunggu Pembayaran
              </h3>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-[14px]">
                  Silakan melakukan pembayaran sesuai dengan total yang tertera. Pesanan Anda akan diproses setelah pembayaran diterima.
                </p>
                <p className="text-sm sm:text-[14px]">
                  <span className="font-medium">Batas waktu pembayaran:</span> 24 jam
                </p>
              </div>
            </>
          )}

          {orderDetails.status === "PAID" && (
            <>
              <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                Pembayaran Diterima
              </h3>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-[14px]">
                  Terima kasih atas pembayaran Anda. Pesanan Anda akan segera diproses untuk produksi.
                </p>
              </div>
            </>
          )}

          {orderDetails.status === "PRODUCTION_IN_PROGRESS" && (
            <>
              <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                Pesanan Sedang Diproduksi
              </h3>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-[14px]">
                  Pesanan Anda sedang dalam proses produksi. Kami akan memberitahu Anda ketika pesanan siap untuk dikirim.
                </p>
                <p className="text-sm sm:text-[14px]">
                  <span className="font-medium">Estimasi waktu produksi:</span> 3-5 hari kerja
                </p>
              </div>
            </>
          )}

          {orderDetails.status === "ON_DELIVERY" && (
            <>
              <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                Pesanan Dalam Pengiriman
              </h3>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-[14px]">
                  Pesanan Anda sedang dalam perjalanan ke alamat pengiriman yang Anda berikan.
                </p>
                <p className="mb-2 text-sm sm:text-[14px]">
                  <span className="font-medium">Alamat Pengiriman:</span>{" "}
                  {orderDetails.shippingAddress
                    ? orderDetails.shippingAddress
                    : "Tidak ada alamat pengiriman"}
                </p>
                <p className="text-sm sm:text-[14px]">
                  <span className="font-medium">Estimasi waktu tiba:</span> 2-3 hari kerja
                </p>
              </div>
            </>
          )}

          {orderDetails.status === "DELIVERED" && (
            <>
              <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                Pesanan Telah Diterima
              </h3>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                <p className="mb-2 text-sm sm:text-[14px]">
                  Pesanan Anda telah berhasil diterima. Terima kasih telah berbelanja dengan kami!
                </p>
                <p className="mb-2 text-sm sm:text-[14px]">
                  <span className="font-medium">Tanggal Penerimaan:</span>{" "}
                  {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm sm:text-[14px]">
                  Jika Anda memiliki pertanyaan atau masalah dengan pesanan, silakan hubungi layanan pelanggan kami.
                </p>
              </div>
            </>
          )}

          <div className="bg-gray-200 dark:bg-slate-600 p-3 sm:p-4 rounded-lg text-right">
            <p className="text-lg sm:text-xl font-bold">
              Total:{" "}
              <span className="text-green-600">
                Rp. {orderDetails.totalPrice.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <ButtonSecondary
              onClick={onClose}
              className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300 w-full sm:w-auto"
            >
              Tutup
            </ButtonSecondary>
            {orderDetails.status === "AWAITING_PAYMENT" && (
              <ButtonPrimary
                onClick={handlePayment}
                disabled={isLoading}
                className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:bg-primary-600 w-full sm:w-auto"
              >
                {isLoading ? "Memproses..." : "Bayar Sekarang"}
              </ButtonPrimary>
            )}
            {(orderDetails.status === "PAID" ||
              orderDetails.status === "DELIVERED" ||
              orderDetails.status === "ON_DELIVERY" ||
              orderDetails.status === "PRODUCTION_IN_PROGRESS") && (
              <ButtonPrimary
                className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:bg-primary-600 w-full sm:w-auto"
              >
                Lihat Invoice
              </ButtonPrimary>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsDialog;
