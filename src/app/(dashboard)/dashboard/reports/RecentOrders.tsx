'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { motion } from "framer-motion";
import { formatDateToLocal } from "../../components/utils";

interface RecentOrdersProps {
  orders: {
    orderId: string;
    totalPrice: number;
    createdAt: string;
    status: string;
  }[];
}

export function RecentOrders({ orders }: any) {
  const formatToIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "AWAITING_PRICE":
        return "Menunggu Harga";
      case "AWAITING_PAYMENT":
        return "Menunggu Pembayaran";
      case "PAID":
        return "Dibayar";
      case "PRODUCTION_IN_PROGRESS":
        return "Dalam Proses Produksi";
      case "AWAITING_DELIVERY":
        return "Menunggu Pengiriman";
      case "ON_DELIVERY":
        return "Dalam Pengiriman";
      case "DELIVERED":
        return "Diterima";
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="pb-0 pt-4 px-6">
          <h4 className="font-bold text-2xl text-gray-800">Recent Orders</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-4 px-6">
          {orders.map((order: any, index: any) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-gray-700">Order ID: #{order.orderId}</p>
                <p className="text-sm text-gray-500">{formatToIDR(order.totalPrice)}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">{formatDateToLocal(order.createdAt)}</p>
                <p className="text-sm text-gray-500">{formatStatus(order.status)}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
}
