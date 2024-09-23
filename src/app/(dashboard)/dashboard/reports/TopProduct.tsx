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
      <Card>
        <CardHeader className="pb-0 pt-2 px-4">
          <h4 className="font-bold text-lg">Top Products</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {products.map((product, index) => (
            <div key={index} className="mb-4">
              <p className="mb-1">{product.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(product.orderCount / maxOrderCount) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-right mt-1">{product.orderCount} orders</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
}