// app/dashboard/reports/MonthlySalesChart.tsx
'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

export function MonthlySalesChart({ monthlyOrders }: { monthlyOrders: any[] }) {
  const data = monthlyOrders.map(order => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: order.totalPrice
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full h-[400px]">
        <CardHeader className="pb-0 pt-2 px-4">
          <h4 className="font-bold text-lg">Monthly Sales</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </motion.div>
  );
}