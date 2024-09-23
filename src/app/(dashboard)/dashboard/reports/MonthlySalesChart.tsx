// app/dashboard/reports/MonthlySalesChart.tsx
'use client';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

interface OrderData {
  createdAt: Date;
  totalPrice: number | null;
}

interface ChartData {
  date: string;
  amount: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};

export function MonthlySalesChart({ monthlyOrders }: { monthlyOrders: OrderData[] }) {
  const groupedData = monthlyOrders.reduce<Record<string, ChartData>>((acc, order) => {
    const date = order.createdAt.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = { date, amount: 0 };
    }
    acc[date].amount += order.totalPrice || 0;
    return acc;
  }, {});

  const data: ChartData[] = Object.values(groupedData);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No sales data available for the past three months.</p>
      </div>
    );
  }

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
        <CardBody className="overflow-visible py-2 w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value / 1000}K`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </motion.div>
  );
}
