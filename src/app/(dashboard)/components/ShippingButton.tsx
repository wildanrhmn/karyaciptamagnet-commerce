"use client";

import { useState } from "react";
import { TruckIcon, CheckIcon, EyeIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import toast from "react-hot-toast";
import {
  setOrderStatusToOnDelivery,
  setOrderStatusToDelivered,
} from "../data/action";
import OrderStatus from "./OrderStatus";

export function ViewShippingDetail({ order }: { order: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        size="4xl"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "bg-white dark:bg-gray-800 rounded-lg shadow-xl",
          header: "border-b border-gray-200 dark:border-gray-700",
          body: "p-6",
          footer: "border-t border-gray-200 dark:border-gray-700",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Order and Shipping Details</h2>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6 text-sm">
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Name:</span> {order.customerName}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Email:</span> {order.customerEmail}</p>
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Order Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Order ID:</span> {order.id}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Total Price:</span> Rp. {order.totalPrice?.toLocaleString()}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Status:</span> <OrderStatus status={order.status} /></p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Estimated Delivery:</span> {order.estimated ? new Date(order.estimated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Total Weight:</span> {order.totalWeight ? `${order.totalWeight} kg` : '-'}</p>
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Shipping Information</h3>
                    <div className="flex flex-col gap-5">
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Shipping Address:</span> {order.shippingAddress}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Shipping Status:</span> <OrderStatus status={order.shippingStatus} /></p>
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Order Items</h3>
                    <div className="space-y-4">
                      {order.products.map((product: any, index: number) => (
                        <div key={index} className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm space-y-2">
                          <p><span className="font-medium text-gray-600 dark:text-gray-300">Product:</span> {product.productName}</p>
                          <p><span className="font-medium text-gray-600 dark:text-gray-300">Quantity:</span> {product.quantity}</p>
                          <p><span className="font-medium text-gray-600 dark:text-gray-300">Customization:</span> {product.customization}</p>
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


export function SetOrderToOnDelivery({ order }: { order: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [estimatedTime, setEstimatedTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const estimatedTimeNumber = parseInt(estimatedTime);
    if (isNaN(estimatedTimeNumber)) {
      toast.error("Please enter a valid number for estimated time");
      return;
    }
    try {
      const result = await setOrderStatusToOnDelivery(
        order.id,
        estimatedTimeNumber
      );
      if (result.message) {
        toast.success(result.message);
        onClose();
      } else {
        throw new Error("No message returned from server");
      }
    } catch (error) {
      toast.error(
        "Failed to update order status: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md border p-2 hover:bg-gray-100 transition-colors duration-200"
      >
        <TruckIcon className="w-5 text-gray-600" />
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
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Set Order to On Delivery
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6 text-sm">
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Order Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <p>
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          Customer Name:
                        </span>{" "}
                        {order.customerName}
                      </p>
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Products
                    </h3>
                    <div className="space-y-4">
                      {order.products.map((product: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm space-y-2"
                        >
                          <p>
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                              Product Name:
                            </span>{" "}
                            {product.productName}
                          </p>
                          <p>
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                              Quantity:
                            </span>{" "}
                            {product.quantity}
                          </p>
                          <p>
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                              Customization:
                            </span>{" "}
                            {product.customization}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Shipping Information</h3>
                    <div className="flex flex-col gap-5">
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Shipping Address:</span> {order.shippingAddress}</p>
                      <p><span className="font-medium text-gray-600 dark:text-gray-300">Shipping Status:</span> <OrderStatus status={order.shippingStatus} /></p>
                    </div>
                  </section>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="estimatedTime"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Estimated Delivery Time (in days)
                      </label>
                      <input
                        type="number"
                        id="estimatedTime"
                        value={estimatedTime}
                        onChange={(e) => setEstimatedTime(e.target.value)}
                        className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 mr-2"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Set to On Delivery
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function SetOrderToDelivered({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await setOrderStatusToDelivered(id);
      if (result.message) {
        toast.success(result.message);
        onClose();
      }
    } catch (error) {
      toast.error("An error occurred while updating the order status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md border p-2 hover:bg-gray-100 transition-colors duration-200"
      >
        <CheckIcon className="w-5 text-gray-600" />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "bg-white dark:bg-gray-800 rounded-lg shadow-xl",
          header: "border-b border-gray-200 dark:border-gray-700",
          body: "p-6",
          footer: "border-t border-gray-200 dark:border-gray-700",
        }}
      >
        <ModalContent>
          <ModalHeader>Mark as Delivered</ModalHeader>
          <ModalBody>
            Are you sure you want to mark this order as delivered?
          </ModalBody>
          <ModalFooter>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">
                    Processing...
                  </span>
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}