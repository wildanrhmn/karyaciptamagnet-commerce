"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import { EyeIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ClockIcon, CogIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface OrderButtonProps {
  order: {
    id: string;
    amount: number;
    date: Date;
    status: string;
    shippingStatus: string;
    name: string;
    email: string;
    image_url: string;
    product_names: string[];
    quantities: number[];
    item_prices: number[];
  };
}

export const statusInfo = {
  AWAITING_PRICE: {
    label: 'Menunggu Harga',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: ClockIcon,
  },
  AWAITING_PAYMENT: {
    label: 'Menunggu Pembayaran',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    icon: ClockIcon,
  },
  PAID: {
    label: 'Sudah Dibayar',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: CreditCardIcon,
  },
  PRODUCTION_IN_PROGRESS: {
    label: 'Produksi Berlangsung',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    icon: CogIcon,
  },
  ON_DELIVERY: {
    label: 'Dalam Pengiriman',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: CheckIcon,
  },
  DELIVERED: {
    label: 'Terkirim',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    icon: CheckIcon,
  },
};

function formatStatus(status: string) {
  const currentStatus = statusInfo[status as keyof typeof statusInfo];
  if (!currentStatus) return status;

  const { label, bgColor, textColor, icon: Icon } = currentStatus;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        bgColor,
        textColor
      )}
    >
      <Icon className="mr-1 h-4 w-4" />
      {label}
    </span>
  );
}

export function ViewDetailOrder({ order }: OrderButtonProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md border p-2 hover:bg-gray-100 transition-colors duration-200"
      >
        <EyeIcon className="w-5 text-gray-600" />
      </button>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        scrollBehavior="inside"
        size="3xl"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "bg-white dark:bg-gray-800 rounded-lg shadow-xl",
          header: "border-b border-gray-200 dark:border-gray-700",
          body: "p-6",
          footer: "border-t border-gray-200 dark:border-gray-700",
        }}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Order Details</h2>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6 text-sm">
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Name:</span> {order.name}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Email:</span> {order.email}</p>
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Order Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Order ID:</span> {order.id}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Date:</span> {order.date.toLocaleString()}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Total Amount:</span> Rp. {order.amount.toLocaleString()}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Status:</span> {formatStatus(order.status)}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Shipping Status:</span> {order.shippingStatus}</p>
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Order Items</h3>
                    <div className="space-y-4">
                      {order.product_names.map((product, index) => (
                        <div key={index} className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm space-y-2">
                          <p><span className="font-medium text-gray-600 dark:text-gray-300">Product:</span> {product}</p>
                          <p><span className="font-medium text-gray-600 dark:text-gray-300">Quantity:</span> {order.quantities[index]}</p>
                          <p><span className="font-medium text-gray-600 dark:text-gray-300">Price:</span> Rp. {order.item_prices[index].toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  Close
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
