// app/dashboard/reports/TopProducts.tsx
'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { motion } from "framer-motion";

export function TopProducts({ products }: { products: any[] }) {
  const maxOrderCount = Math.max(...products.map(p => p.orderCount));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="pb-0 pt-4 px-6">
          <h4 className="font-bold text-2xl text-gray-800">Produk Terlaris</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-4 px-6">
          {products.map((product, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-gray-700">{product.name}</p>
                <p className="text-sm text-gray-500">{product.orderCount} pesanan</p>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full" 
                  style={{ width: `${(product.orderCount / maxOrderCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
}