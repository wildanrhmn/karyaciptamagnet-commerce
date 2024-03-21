import { prisma } from "./db/prisma";
import { IProduct, IUser } from "../../@types/definition";
import { notFound } from "next/navigation";
import { cache } from "react";

const ITEMS_PER_PAGE = 6;
export const getTotalPages = async ({
    category,
    query,
} : {
    category?: string,
    query?: string
}): Promise<number> => {
    try {
        const whereClause: any = {};
    
        if (category) {
          whereClause.OR = [{ category: { slug: category } }];
        }
        if (query) {
          whereClause.OR = [{ name: { contains: query, mode: "insensitive" } }];
        }
    
        const data = await prisma.product.count({
          where: whereClause,
        });
    
        const totalPages = Math.ceil(Number(data) / ITEMS_PER_PAGE);
        return totalPages;
      } catch (error) {
        console.log("Database Error: ", error);
        throw new Error("Database Error");
      }
}
export const getProducts = async (currentPage: number = 1): Promise<IProduct[]> => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const products = await prisma.product.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE
        })

        const formattedProductsData = products.map((product) => ({
            ...product,
            imageUrl: JSON.parse(product.imageUrl)
        }))
        return formattedProductsData;
    } catch (e) {
        console.log("Database Error: ", e);
        throw new Error("Database Error");
    }
}

export const getProductById = cache(async (id: string): Promise<IProduct> => {
    try {
        const product: any = await prisma.product.findUnique({
            where: {
                id
            }
        })

        if (!product) notFound();

        const formattedProductData = {
            ...product,
            imageUrl: JSON.parse(product.imageUrl)
        }
        return formattedProductData;
    } catch (e) {
        console.log("Database Error: ", e);
        throw new Error("Database Error");
    }
})

export const getProfileById = cache(async (id: string): Promise<IUser> => {
    try {
        const user: any = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) notFound();

        const formattedUserData = {
            ...user,
            image: JSON.parse(user.image)
        }
        return formattedUserData;
    } catch (e) {
        console.log("Database Error: ", e);
        throw new Error("Database Error");
    }
})