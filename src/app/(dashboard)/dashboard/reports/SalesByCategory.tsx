"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface SalesByCategoryProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

export function SalesByCategory({ data }: SalesByCategoryProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">Sales by Category</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
