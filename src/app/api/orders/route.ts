import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    ProductImages: true,
                  },
                },
              },
            },
          },
        },
        invoice: true,
        payments: true,
        paymentDetails: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching order data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
