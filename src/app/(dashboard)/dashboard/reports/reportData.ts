// app/dashboard/reports/reportData.ts
import { prisma } from "@/lib/db/prisma";

export async function fetchReportData() {
  const currentDate = new Date();
  const threeMonthsAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 3)
  );

  const [totalSales, monthlyOrders, topProducts, recentOrders, salesByCategory, recentReviews] =
    await Promise.all([
      prisma.order.aggregate({
        _sum: { totalPrice: true },
        where: {
          status: {
            in: [
              "PAID",
              "PRODUCTION_IN_PROGRESS",
              "AWAITING_DELIVERY",
              "ON_DELIVERY",
              "DELIVERED",
            ],
          },
        },
      }),
      prisma.order.findMany({
        where: {
          status: {
            in: [
              "PAID",
              "PRODUCTION_IN_PROGRESS",
              "AWAITING_DELIVERY",
              "ON_DELIVERY",
              "DELIVERED",
            ],
          },
          createdAt: { gte: threeMonthsAgo },
        },
        select: { totalPrice: true, createdAt: true },
      }),
      prisma.product.findMany({
        take: 5,
        orderBy: { orderCount: "desc" },
        select: { name: true, orderCount: true },
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          orderId: true,
          totalPrice: true,
          createdAt: true,
          status: true,
        },
      }),
      prisma.productCategory.findMany({
        select: {
          name: true,
          products: {
            select: {
              orderCount: true,
            },
          },
        },
      }),
      prisma.productReview.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          review: true,
          rating: true,
          createdAt: true,
          product: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

  const salesByCategoryData = salesByCategory.map(category => ({
    name: category.name,
    value: category.products.reduce((sum, product) => sum + product.orderCount, 0),
  }));

  return {
    totalSales,
    monthlyOrders,
    topProducts,
    recentOrders,
    salesByCategory: salesByCategoryData,
    recentReviews,
  };
}
