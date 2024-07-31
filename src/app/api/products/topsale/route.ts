import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                orderCount: 'desc'
            },
            take: 5,
            include: {
                ProductImages: true,
                productCategory: {
                    select: {
                        productCategoryId: true,
                        name: true
                    }
                },
                productSubCategory: {
                    select: {
                        productSubCategoryId: true,
                        name: true
                    }
                }
            }
        });
        
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching top sale products:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}