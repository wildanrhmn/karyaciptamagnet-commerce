import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { product_id: string } }
) {

    const { product_id } = params;
    const { userId } = await req.json();

    if (!userId || !product_id) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    try {
        const result = await prisma.$transaction(async (prisma) => {
            const wishlistItem = await prisma.userWishlist.findFirst({
                where: {
                    userId: userId,
                    productId: product_id
                },
            });

            if (wishlistItem) {
                await prisma.userWishlist.delete({ where: { userWishlistId: wishlistItem.userWishlistId } });
                return { action: 'removed' };
            } else {
                await prisma.userWishlist.create({ data: { userId, productId: product_id } });
                return { action: 'added' };
            }
        });

        return NextResponse.json({ 
            success: true, 
            message: `Product ${result.action} to wishlist`,
            action: result.action
        });
    } catch (error: any) {
        console.error("Wishlist operation failed:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Product already in wishlist" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
    }
}