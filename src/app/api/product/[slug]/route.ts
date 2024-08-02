import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;

    try {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
            include: {
                ProductImages: true,
                productCategory: true,
                productSubCategory: true,
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}