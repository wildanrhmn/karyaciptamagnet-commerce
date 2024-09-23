// app/dashboard/reports/SalesSummary.tsx
'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { motion } from "framer-motion";

export function SalesSummary({ totalSales }: { totalSales: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-lg">Total Sales</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p className="font-bold text-3xl">
            ${totalSales.toLocaleString()}
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
}