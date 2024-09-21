"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import toast from "react-hot-toast";
import { setOrderStatusToDelivered } from "@/app/(dashboard)/data/action";

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
      window.location.reload();
    } catch (error) {
      toast.error("An error occurred while updating the order status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonPrimary
        sizeClass="py-2.5 px-4 sm:px-6"
        fontSize="text-sm font-medium"
        onClick={onOpen}
      >
        Terima Produk
      </ButtonPrimary>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="xl"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "bg-white dark:bg-gray-800 rounded-lg shadow-xl",
          header: "border-b border-gray-200 dark:border-gray-700",
          body: "p-6",
          footer: "border-t border-gray-200 dark:border-gray-700",
        }}
      >
        <ModalContent>
          <ModalHeader>Terima Produk</ModalHeader>
          <ModalBody>
            Apakah anda yakin ingin menandai pesanan ini sebagai selesai?

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
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="ml-2">Processing...</span>
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
