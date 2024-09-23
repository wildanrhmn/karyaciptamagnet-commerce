// app/dashboard/reports/reportData.ts
import { prisma } from "@/lib/db/prisma";

export async function fetchReportData() {
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

  const [totalSales, monthlyOrders, topProducts, recentOrders] = await Promise.all([
    prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { status: "PAID" }
    }),
    prisma.order.findMany({
      where: {
        status: "PAID",
        createdAt: { gte: oneMonthAgo }
      },
      select: { totalPrice: true, createdAt: true }
    }),
    prisma.product.findMany({
      take: 5,
      orderBy: { orderCount: 'desc' },
      select: { name: true, orderCount: true }
    }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: { orderId: true, totalPrice: true, createdAt: true, status: true }
    })
  ]);

  return { totalSales, monthlyOrders, topProducts, recentOrders };
}