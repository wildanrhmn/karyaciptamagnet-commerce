"use client";

import { useEffect, useState } from "react";
import Prices from "@/components/Prices";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image, { StaticImageData } from "next/image";
import OrderDetailsDialog from "./orderDetailDialog";
import axios from "axios";
import { deleteOrder } from "@/lib/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);

  function formatStatus(status: string) {
    switch (status) {
      case "AWAITING_PRICE":
        return "Menunggu Harga";
      case "AWAITING_PAYMENT":
        return "Menunggu Pembayaran";
      case "AWAITING_SHIPMENT":
        return "Menunggu Pengiriman";
      case "ON_DELIVERY":
        return "Dalam Pengiriman";
    }
  }

  async function handleDeleteOrder(orderId: string, cartId: string) {
    try {
      const result = await deleteOrder(orderId, cartId);
      if (result.success) {
        toast.success(result.message || "Berhasil menghapus pesanan");
        window.location.reload();
      } else {
        toast.error(result.error || "Gagal menghapus pesanan");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An unexpected error occurred");
    }
  }

  const openDialog = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  const renderProductItem = (item: any, index: number) => {
    const { product, customization, quantity, finalPrice } = item;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="(max-width: 640px) 96px, 112px"
            src={product.ProductImages[0].imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="text-base font-medium line-clamp-2">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{customization}</span>
                </p>
              </div>
              {finalPrice && (
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Total Harga
                  </span>
                  <p className="text-base font-medium">Rp. {finalPrice.toLocaleString()}</p>
                </div>
              )}
              {!finalPrice && (
                <div className="flex flex-col items-end space-y-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Range Harga
                  </span>
                  <Prices className="mt-0.5 ml-2" price={product.priceRange} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm mt-5">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Quantity:</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{quantity}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (order: any) => {
    console.info(order)
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 mt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">#{order.orderId}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">
                {formatStatus(order.status)}
              </span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
              onClick={() => openDialog(order)}
            >
              Detail Pesanan
            </ButtonSecondary>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {order.cart.items.map((item: any, index: number) => (
            <div key={index}>{renderProductItem(item, index)}</div>
          ))}
        </div>

        <div className="mt-2 flex justify-end items-center opacity-75 mr-4 mb-4">
          <button className="text-primary-600 hover:text-primary-700 transition-colors duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Hubungi Penjual
          </button>
          {order.status === "AWAITING_PRICE" && (
            <button
              className="ml-4 text-red-600 hover:text-red-700 transition-colors duration-300 flex items-center"
              onClick={() => handleDeleteOrder(order.orderId, order.cart.cartId)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus Pesanan
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold">Histori Pemesanan</h2>
      {orders.map((order: any) => renderOrder(order))}
      <OrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        orderDetails={selectedOrder}
      />
    </div>
  );
};

export default AccountOrder;
