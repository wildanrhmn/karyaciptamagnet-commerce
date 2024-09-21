import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db/prisma";

export async function fetchCardData() {
  noStore();
  try {
    const [numberOfOrders, numberOfCustomers, ordersByStatus] =
      await Promise.all([
        prisma.order.count(),
        prisma.user.count({
          where: {
            scope: 'member',
          }
        }),
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

    const totalAwaitingPrice = awaitingPriceOrders?._sum.totalPrice ?? 0;
    const totalAwaitingPayment = awaitingPaymentOrders?._sum.totalPrice ?? 0;

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

export async function fetchRevenue(): Promise<
  { month: string; revenue: number }[]
> {
  noStore();
  try {
    const completedOrders = await prisma.order.findMany({
      where: {
        status: "COMPLETED",
      },
      select: {
        totalPrice: true,
        createdAt: true,
      },
    });

    const monthlyRevenue = completedOrders.reduce((acc, order) => {
      const month = order.createdAt.toLocaleString("default", {
        month: "short",
      });
      const revenue = order.totalPrice || 0;

      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += revenue;
      return acc;
    }, {} as Record<string, number>);

    const revenue = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    revenue.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    return revenue;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
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
        status: true,
        shippingStatus: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    const latestOrders = data.map((order) => {
      let imageUrl = "";
      if (order.user.image) {
        try {
          const imageObject = JSON.parse(order.user.image);
          imageUrl = imageObject.url || "";
        } catch (error) {
          console.error("Error parsing image JSON:", error);
        }
      }
      return {
        id: order.orderId,
        name: order.user.name || "",
        email: order.user.email || "",
        image_url: imageUrl ? `/${imageUrl}` : "",
        amount: order.totalPrice || null,
        status: order.status,
        shippingStatus: order.shippingStatus,
      };
    });
    return latestOrders;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest orders.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredSubmissions(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const isQueryANumber = !isNaN(Number(query));
  try {
    const orders = await prisma.order.findMany({
      select: {
        orderId: true,
        totalPrice: true,
        createdAt: true,
        status: true,
        shippingStatus: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      where: {
        AND: [
          { status: "AWAITING_PRICE" },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { user: { email: { contains: query, mode: "insensitive" } } },
              { shippingStatus: { contains: query, mode: "insensitive" } },
              isQueryANumber ? { totalPrice: { equals: Number(query) } } : {},
            ],
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    const processedOrders = orders.map((order) => {
      let imageUrl = "";
      if (order.user.image) {
        try {
          const imageObject = JSON.parse(order.user.image);
          imageUrl = imageObject.url || "";
        } catch (error) {
          console.error("Error parsing image JSON:", error);
        }
      }
      return {
        id: order.orderId,
        amount: order.totalPrice || null,
        date: order.createdAt,
        status: order.status,
        shippingStatus: order.shippingStatus,
        name: order.user.name || "",
        email: order.user.email || "",
        image_url: imageUrl,
      };
    });
    return processedOrders;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch orders.");
  }
}

export async function fetchSubmissionsPages(query: string) {
  noStore();
  try {
    const isQueryANumber = !isNaN(Number(query));
    const count = await prisma.order.count({
      where: {
        AND: [
          { status: "AWAITING_PRICE" },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { user: { email: { contains: query, mode: "insensitive" } } },
              { shippingStatus: { contains: query, mode: "insensitive" } },
              isQueryANumber ? { totalPrice: { equals: Number(query) } } : {},
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of orders.");
  }
}

export async function fetchFilteredOrders(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const isQueryANumber = !isNaN(Number(query));
  try {
    const orders = await prisma.order.findMany({
      select: {
        orderId: true,
        totalPrice: true,
        createdAt: true,
        status: true,
        shippingStatus: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        cart: {
          select: {
            items: {
              select: {
                product: {
                  select: {
                    name: true,
                  }
                },
                quantity: true,
                finalPrice: true,
              }
            }
          }
        }
      },
      where: {
        AND: [
          { status: { not: "AWAITING_PRICE" } },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { user: { email: { contains: query, mode: "insensitive" } } },
              { shippingStatus: { contains: query, mode: "insensitive" } },
              isQueryANumber ? { totalPrice: { equals: Number(query) } } : {},
            ],
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    const processedOrders = orders.map((order) => {
      let imageUrl = "";
      if (order.user.image) {
        try {
          const imageObject = JSON.parse(order.user.image);
          imageUrl = imageObject.url || "";
        } catch (error) {
          console.error("Error parsing image JSON:", error);
        }
      }
      const productNames = order.cart.items.map(item => item.product.name);
      const quantities = order.cart.items.map(item => item.quantity);
      const itemPrices = order.cart.items.map(item => item.finalPrice || 0);
      return {
        id: order.orderId,
        amount: order.totalPrice || null,
        date: order.createdAt,
        status: order.status,
        shippingStatus: order.shippingStatus,
        name: order.user.name || "",
        email: order.user.email || "",
        image_url: imageUrl,
        product_names: productNames,
        quantities: quantities,
        item_prices: itemPrices,
      };
    });
    return processedOrders;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch orders.");
  }
}

export async function fetchOrderPages(query: string) {
  noStore();
  try {
    const isQueryANumber = !isNaN(Number(query));
    const count = await prisma.order.count({
      where: {
        AND: [
          { status: { not: "AWAITING_PRICE" } },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { user: { email: { contains: query, mode: "insensitive" } } },
              { shippingStatus: { contains: query, mode: "insensitive" } },
              isQueryANumber ? { totalPrice: { equals: Number(query) } } : {},
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of orders.");
  }
}

export async function fetchFilteredProduction(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          { status: { in: ["PAID", "PRODUCTION_IN_PROGRESS"] } },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { cart: { items: { some: { product: { name: { contains: query, mode: "insensitive" } } } } } },
            ],
          },
        ],
      },
      include: {
        user: true,
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'asc',
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    const processedOrders = orders.map((order) => ({
      id: order.orderId,
      customerName: order.user.name || "",
      customerEmail: order.user.email || "",
      totalPrice: order.totalPrice || null,
      estimated: order.estimated || null,
      totalWeight: order.totalWeight || null,
      products: order.cart.items.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        customization: item.customization,
      })),
      status: order.status,
    }));

    return processedOrders;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch production orders.");
  }
}

export async function fetchFilteredProductionPages(query: string) {
  noStore();
  try {
    const count = await prisma.order.count({
      where: {
        AND: [
          { status: { in: ["PAID", "PRODUCTION_IN_PROGRESS"] } },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { cart: { items: { some: { product: { name: { contains: query, mode: "insensitive" } } } } } },
            ],
          },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of production pages.");
  }
}

export async function fetchFilteredShipping(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          { status: { in: ["ON_DELIVERY", "DELIVERED"] } },
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { cart: { items: { some: { product: { name: { contains: query, mode: "insensitive" } } } } } },
            ],
          },
        ],
      },
      include: {
        user: true,
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    const processedOrders = orders.map((order) => ({
      id: order.orderId,
      customerName: order.user.name || "",
      customerEmail: order.user.email || "",
      totalPrice: order.totalPrice || null,
      estimated: order.estimated || null,
      totalWeight: order.totalWeight || null,
      shippingAddress: order.shippingAddress || "",
      shippingStatus: order.shippingStatus || "",
      products: order.cart.items.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        customization: item.customization,
      })),
      status: order.status,
    }));

    return processedOrders;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch shipping orders.");
  }
}

export async function fetchShippingPages(query: string) {
  noStore();
  try {
    const count = await prisma.order.count({
      where: {
        status: { in: ["ON_DELIVERY", "DELIVERED"] },
        AND: [
          {
            OR: [
              { user: { name: { contains: query, mode: "insensitive" } } },
              { cart: { items: { some: { product: { name: { contains: query, mode: "insensitive" } } } } } },
            ],
          },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of shipping pages.");
  }
}


export async function fetchOrderById(id: string) {
  noStore();
  try {
    const order = await prisma.order.findUnique({
      where: { orderId: id },
      include: {
        user: true,
        cart: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    ProductImages: true,
                    productCategory: true,
                    productSubCategory: true,
                  }
                }
              }
            }
          }
        },
        invoice: true,
        payments: true,
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch order.');
  }
}

export async function fetchFilteredProducts(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      include: {
        ProductImages: true,
        productCategory: true,
        productSubCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered products.');
  }
}

export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await prisma.product.count({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products pages.');
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const categories = await prisma.productCategory.findMany({
      include: {
        productSubCategories: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product categories.');
  }
}

export async function fetchSubCategories() {
  noStore();
  try {
    const subCategories = await prisma.productSubCategory.findMany({
      include: {
        productCategory: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return subCategories;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product subcategories.');
  }
}




