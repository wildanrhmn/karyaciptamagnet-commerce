// app/dashboard/reports/SalesSummary.tsx
'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { motion } from "framer-motion";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};

export function SalesSummary({ totalSales }: { totalSales: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg rounded-lg">
        <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
          <h4 className="font-bold text-2xl mb-2">Total Penjualan</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-4 px-6">
          <p className="font-bold text-4xl">
            {formatCurrency(totalSales)}
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
}