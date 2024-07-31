import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { product_id: string } }
) {
  const session = await auth();

  const { product_id } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ isLiked: false });
  }

  try {
    const wishlistItem = await prisma.userWishlist.findFirst({
      where: {
        userId: session.user.id,
        productId: product_id,
      },
    });

    return NextResponse.json({ isLiked: !!wishlistItem });
  } catch (error) {
    console.error("Error checking wishlist status:", error);
    return NextResponse.json({ error: "Failed to check wishlist status" }, { status: 500 });
  }
}