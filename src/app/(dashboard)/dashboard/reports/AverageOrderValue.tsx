// app/dashboard/reports/AverageOrderValue.tsx
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export function AverageOrderValue({ value }: { value: number }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">Average Order Value</h3>
      </CardHeader>
      <CardBody>
        <p className="text-3xl font-bold">${value.toFixed(2)}</p>
      </CardBody>
    </Card>
  );
}