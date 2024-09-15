import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db/prisma";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export async function fetchCardData() {
  noStore();
  try {
    const [numberOfOrders, numberOfCustomers, ordersByStatus] =
      await Promise.all([
        prisma.order.count(),
        prisma.user.count(),
        prisma.order.groupBy({
          by: ["status"],
          _sum: {
            totalPrice: true,
          },
        }),
      ]);

    const awaitingPriceOrders = ordersByStatus.find(
      (order) => order.status === "AWAITING_PRICE"
    );
    const awaitingPaymentOrders = ordersByStatus.find(
      (order) => order.status === "AWAITING_PAYMENT"
    );

    const totalAwaitingPrice = formatCurrency(
      awaitingPriceOrders?._sum.totalPrice ?? 0
    );
    const totalAwaitingPayment = formatCurrency(
      awaitingPaymentOrders?._sum.totalPrice ?? 0
    );

    return {
      numberOfCustomers,
      numberOfOrders,
      totalAwaitingPrice,
      totalAwaitingPayment,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchRevenue(): Promise<{ month: string; revenue: number }[]> {
  noStore();
  try {
    const completedOrders = await prisma.order.findMany({
      where: {
        status: 'COMPLETED'
      },
      select: {
        totalPrice: true,
        createdAt: true
      }
    });

    const monthlyRevenue = completedOrders.reduce((acc, order) => {
      const month = order.createdAt.toLocaleString('default', { month: 'short' });
      const revenue = order.totalPrice || 0;
      
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += revenue;
      return acc;
    }, {} as Record<string, number>);

    const revenue = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue
    }));

    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    revenue.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestOrders() {
    noStore();
    try {
      const data = await prisma.order.findMany({
        select: {
          orderId: true,
          totalPrice: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      });
      const latestOrders = data.map((order) => {
        let imageUrl = '';
        if (order.user.image) {
          try {
            const imageObject = JSON.parse(order.user.image);
            imageUrl = imageObject.url || '';
          } catch (error) {
            console.error('Error parsing image JSON:', error);
          }
        }
        return {
          id: order.orderId,
          name: order.user.name || '',
          email: order.user.email || '',
          image_url: imageUrl,
          amount: order.totalPrice ? formatCurrency(order.totalPrice) : 'N/A',
        };
      });
      return latestOrders;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest orders.');
    }
  }
