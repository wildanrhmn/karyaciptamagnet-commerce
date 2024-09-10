import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { prisma } from "@/lib/db/prisma";
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const checkHash = async (body: any) => {
  const hash = crypto
    .createHash("sha512")
    .update(
      `${body.order_id}${body.status_code}${body.gross_amount}${env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");
  return body.signature_key === hash;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received body:", body);

        if (!(await checkHash(body))) {
            console.error("Invalid signature key");
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const orderId = body.order_id;
        const transactionStatus = body.transaction_status;
        const fraudStatus = body.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        let newStatus;
        if (transactionStatus === "capture") {
            newStatus = fraudStatus === "accept" ? "PAID" : "PAYMENT_CHALLENGE";
        } else if (transactionStatus === "settlement") {
            newStatus = "PAID";
        } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
            newStatus = "PAYMENT_FAILED";
        } else if (transactionStatus === "pending") {
            newStatus = "AWAITING_PAYMENT";
        } else {
            newStatus = "UNKNOWN";
        }

        await updateOrderStatus(orderId, newStatus);

        return NextResponse.json({ status: 'OK' });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function updateOrderStatus(orderId: string, status: string) {
    await prisma.order.update({
        where: { orderId },
        data: { status }
    });

    if (status === 'PAID') {
        const order = await prisma.order.findUnique({
            where: { orderId },
            include: { cart: { include: { items: true } } }
        });

        if (order) {
            for (const item of order.cart.items) {
                await prisma.product.update({
                    where: { productId: item.productId },
                    data: {
                        stock: { decrement: item.quantity },
                        orderCount: { increment: item.quantity }
                    }
                });
            }
        }
    }
}