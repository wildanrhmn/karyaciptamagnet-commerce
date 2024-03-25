import { prisma } from "./db/prisma";
import { IProduct, IUser } from "../../@types/definition";
import { notFound } from "next/navigation";
import { cache } from "react";
import { transformDocument } from "@prisma/client/runtime";

const ITEMS_PER_PAGE = 6;
export const getTotalPages = async ({
    category,
    query,
}: {
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
            },
            include: {
                addresses: {
                    include: {
                        province: true,
                        city: true,
                    }
                }
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

export const getPronvinces = async (): Promise<any[]> => {
    try {
        const provinces = await prisma.provinces.findMany({
            select: {
                id: true,
                name: true,
                cities: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return provinces;
    } catch (e) {
        console.log("Database Error: ", e);
        throw new Error("Database Error");
    }
}

export const getUserAddresses = async ({ userId }: { userId: string }): Promise<any[]> => {
    try {
        const addresses = await prisma.addresses.findMany({
            where: {
                userId
            },
            include: {
                province: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                city: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        phoneNumber: true,
                    }
                },
            }
        });

        // Sort the addresses so that the active address comes first
        addresses.sort((a, b) => {
            if (a.isActive) return -1; // Active address comes first
            if (b.isActive) return 1;
            return 0;
        });

        return addresses;
    } catch (e) {
        console.log("Database Error: ", e);
        throw new Error("Database Error");
    }
}