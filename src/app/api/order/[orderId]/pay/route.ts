import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { Snap } from "midtrans-client";

export const dynamic = "force-dynamic";

const snapMidtrans = new Snap({
  isProduction: false,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.MIDTRANS_CLIENT_KEY,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { province: true, city: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const fullAddress = `${user.fullAddress || ''}, ${user.city?.name || ''}, ${user.province?.name || ''}`.trim();

    const existingOrder = await prisma.order.findUnique({
      where: { orderId },
      include: {
        cart: {
          include: {
            items: {
              include: { product: true },
            },
          },
        },
        payments: true,
      },
    });

    if (!existingOrder || existingOrder.userId !== userId) {
      return NextResponse.json(
        { error: "Order not found or unauthorized" },
        { status: 404 }
      );
    }

    const existingPayment = existingOrder.payments;

    const totalWeight = existingOrder.cart.items.reduce((sum, item) => sum + (item.product.weight * item.quantity), 0);

    await prisma.order.update({
      where: { orderId },
      data: {
        totalWeight,
        shippingAddress: fullAddress,
      },
    });

    const transaction = {
      transaction_details: {
        order_id: existingOrder.orderId,
        gross_amount: existingOrder.totalPrice || 0,
      },
      customer_details: {
        first_name: user.name || "Customer",
        email: user.email || "",
        phone: user.phoneNumber || "",
        billing_address: {
          first_name: user.name || "Customer",
          phone: user.phoneNumber || "",
          address: fullAddress,
          city: user.city?.name || "",
          postal_code: "",
          country_code: "IDN",
        },
        shipping_address: {
          first_name: user.name || "Customer",
          phone: user.phoneNumber || "",
          address: fullAddress,
          city: user.city?.name || "",
          postal_code: "",
          country_code: "IDN",
        },
      },
      item_details: existingOrder.cart.items.map((item) => ({
        id: item.productId,
        price: item.finalPrice || 0,
        quantity: item.quantity,
        name: item.product.name,
      })),
    };

    const midtransResponse = await snapMidtrans.createTransaction(transaction);

    const paymentData = {
      amount: existingOrder.totalPrice || 0,
      paymentMethod: "midtrans",
      status: "PENDING",
      snapToken: midtransResponse.token,
      snapRedirectUrl: midtransResponse.redirect_url,
    };

    let payment;
    if (existingPayment) {
      payment = await prisma.payment.update({
        where: { orderId: existingOrder.orderId },
        data: paymentData,
      });
    } else {
      payment = await prisma.payment.create({
        data: {
          ...paymentData,
          orderId: existingOrder.orderId,
        },
      });
    }

    return NextResponse.json({
      paymentToken: midtransResponse.token,
      paymentUrl: midtransResponse.redirect_url,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
