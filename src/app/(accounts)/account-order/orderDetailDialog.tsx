import React from "react";
import Image from "next/image";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { StaticImageData } from "next/image";

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

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen || !orderDetails) return null;

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
            <span className="font-semibold">No. Invoice:</span>{" "}
            <span className="text-blue-600">{orderDetails.invoiceNumber}</span>
          </p>
          <p>
            <span className="font-semibold">Tanggal Pembelian:</span>{" "}
            <span className="text-green-600">{orderDetails.purchaseDate}</span>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Detail Produk</h3>
          {orderDetails.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start mb-4 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-md mr-4"
              />
              <div>
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {product.quantity} x{" "}
                  <span className="text-green-600">
                    Rp{product.price.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Info Pengiriman</h3>
          <p className="mb-2">
            <span className="font-medium">Kurir:</span>{" "}
            {orderDetails.shipping.courier}
          </p>
          <p className="mb-2">
            <span className="font-medium">No Resi:</span>{" "}
            <span className="text-blue-600">
              {orderDetails.shipping.trackingNumber}
            </span>
          </p>
          <p>
            <span className="font-medium">Alamat:</span>{" "}
            {orderDetails.shipping.address}
          </p>
        </div>

        <div className="bg-gray-200 dark:bg-slate-600 p-4 rounded-lg text-right">
          <p className="text-xl font-bold">
            Total:{" "}
            <span className="text-green-600">
              Rp{orderDetails.totalPrice.toLocaleString()}
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
