// app/dashboard/reports/OrderStatusBreakdown.tsx
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusCount {
  status: string;
  count: number;
}

export function OrderStatusBreakdown({ data }: { data: StatusCount[] }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">Order Status Breakdown</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}