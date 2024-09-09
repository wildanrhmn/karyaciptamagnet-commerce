import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;

        const cart = await prisma.cart.findFirst({
            where: {
                userId,
                status: { not: "completed" }
            },
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
        });

        if (!cart) {
            return NextResponse.json({ items: [] });
        }

        let totalPrice = 0;
        let itemsWithFinalPrice = 0;

        cart.items.forEach(item => {
            if (item.finalPrice !== null) {
                totalPrice += item.finalPrice * item.quantity;
                itemsWithFinalPrice++;
            }
        });

        const cartData = {
            ...cart,
            totalPrice,
            itemsWithFinalPrice,
            allItemsPriced: itemsWithFinalPrice === cart.items.length
        };

        return NextResponse.json(cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}