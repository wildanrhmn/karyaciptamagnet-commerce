"use client";

import React, { useState } from "react";
import Image from "next/image";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Script from "next/script";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
          window.location.reload();
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

  if (!orderDetails) return null;

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        scrollBehavior="inside"
        size="3xl"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/50",
          base: "bg-white",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Transaksi
          </ModalHeader>
          <ModalBody>
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
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    Pesanan Anda sedang dalam proses konfirmasi harga. Kami akan segera menghubungi Anda untuk memberikan informasi harga final.
                  </p>
                  {orderDetails.estimated && (
                    <p className="text-sm sm:text-[14px]">
                      <span className="font-medium">Estimasi Selesai:</span>{" "}
                      {new Date(orderDetails.estimated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </>
            )}

            {orderDetails.status === "AWAITING_PAYMENT" && (
              <>
                <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                  Menunggu Pembayaran
                </h3>
                <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    Silakan melakukan pembayaran sesuai dengan total yang tertera. Pesanan Anda akan diproses setelah pembayaran diterima.
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
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
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
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    Pesanan Anda sedang dalam proses produksi. Kami akan memberitahu Anda ketika pesanan siap untuk dikirim.
                  </p>
                  {orderDetails.estimated && (
                    <p className="text-sm sm:text-[14px]">
                      <span className="font-medium">Estimasi Selesai Produksi:</span>{" "}
                      {new Date(orderDetails.estimated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </>
            )}

            {orderDetails.status === "ON_DELIVERY" && (
              <>
                <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                  Pesanan Dalam Pengiriman
                </h3>
                <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    Pesanan Anda sedang dalam perjalanan ke alamat pengiriman yang Anda berikan.
                  </p>
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    <span className="font-medium">Alamat Pengiriman:</span>{" "}
                    {orderDetails.shippingAddress
                      ? orderDetails.shippingAddress
                      : "Tidak ada alamat pengiriman"}
                  </p>
                  {orderDetails.estimated && (
                    <p className="text-sm sm:text-[14px] leading-8">
                      <span className="font-medium">Estimasi Tiba:</span>{" "}
                      {new Date(orderDetails.estimated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </>
            )}

            {orderDetails.status === "DELIVERED" && (
              <>
                <h3 className="font-semibold mb-3 mt-5 text-sm sm:text-base">
                  Pesanan Telah Diterima
                </h3>
                <div className="bg-gray-100 dark:bg-slate-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    Pesanan Anda telah berhasil diterima. Terima kasih telah berbelanja dengan kami!
                  </p>
                  <p className="mb-2 text-sm sm:text-[14px] leading-8">
                    <span className="font-medium">Tanggal Penerimaan:</span>{" "}
                    {new Date(orderDetails.estimated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm sm:text-[14px] leading-8">
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
          </ModalBody>
          <ModalFooter>
            <ButtonSecondary onClick={onClose}>
              Tutup
            </ButtonSecondary>
            {orderDetails.status === "AWAITING_PAYMENT" && (
              <ButtonPrimary
                onClick={handlePayment}
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Bayar Sekarang"}
              </ButtonPrimary>
            )}
            {(orderDetails.status === "PAID" ||
              orderDetails.status === "DELIVERED" ||
              orderDetails.status === "ON_DELIVERY" ||
              orderDetails.status === "PRODUCTION_IN_PROGRESS") && (
              <ButtonPrimary
                onClick={() => router.push(`/invoice/${orderDetails.orderId}`)}
              >
                Lihat Invoice
              </ButtonPrimary>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderDetailsDialog;
