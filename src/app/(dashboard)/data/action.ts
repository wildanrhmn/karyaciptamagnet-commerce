"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import cloudinary from '@/lib/cloudinary';

const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  weight: z.coerce.number().positive("Weight must be a positive number"),
  priceRange: z.string().min(1, "Price range is required"),
  productCategoryId: z.string().min(1, "Product category is required"),
  productSubCategoryId: z.string().min(1, "Product sub-category is required"),
  stock: z.coerce.number().int().nonnegative("Stock must be a non-negative integer"),
});

type ProductState = {
  errors?: {
    name?: string[];
    description?: string[];
    weight?: string[];
    priceRange?: string[];
    productCategoryId?: string[];
    productSubCategoryId?: string[];
    stock?: string[];
  };
  message: string | null;
};

export async function createProduct(prevState: ProductState, formData: FormData): Promise<ProductState> {
  const validatedFields = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    weight: formData.get("weight"),
    priceRange: formData.get("priceRange"),
    productCategoryId: formData.get("productCategoryId"),
    productSubCategoryId: formData.get("productSubCategoryId"),
    stock: formData.get("stock"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  const {
    name,
    description,
    weight,
    priceRange,
    productCategoryId,
    productSubCategoryId,
    stock,
  } = validatedFields.data;

  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const smallDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  try {
    const imageUrls = [];
    for (let i = 0; i < 3; i++) {
      const imageData = formData.get(`image${i}`);
      if (imageData) {
        const result = await cloudinary.uploader.upload(imageData as string, {
          folder: 'product-images',
        });
        imageUrls.push({ imageUrl: result.secure_url, publicUrl: result.public_id });
      }
    }

    await prisma.product.create({
      data: {
        name,
        description,
        weight,
        priceRange,
        productCategoryId,
        productSubCategoryId,
        stock,
        slug,
        smallDescription,
        ProductImages: {
          create: imageUrls,
        },
      },
    });

    revalidatePath("/dashboard/inventory");
    return { message: "Product created successfully" };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }
}

export async function createProductAndRedirect(prevState: ProductState, formData: FormData) {
  const result = await createProduct(prevState, formData);
  if (!result.errors) {
    redirect("/dashboard/inventory");
  }
  return result;
}

export async function updateProduct(productId: string, prevState: ProductState, formData: FormData): Promise<ProductState> {
  const validatedFields = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    weight: formData.get("weight"),
    priceRange: formData.get("priceRange"),
    productCategoryId: formData.get("productCategoryId"),
    productSubCategoryId: formData.get("productSubCategoryId"),
    stock: formData.get("stock"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Product.",
    };
  }

  const {
    name,
    description,
    weight,
    priceRange,
    productCategoryId,
    productSubCategoryId,
    stock,
  } = validatedFields.data;

  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const smallDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { productId },
      include: { ProductImages: true },
    });

    if (!existingProduct) {
      return {
        message: "Product not found.",
      };
    }

    const existingImages = existingProduct.ProductImages;
    const updatedImageUrls = [];
    const imagesToDelete = [...existingImages];

    for (let i = 0; i < 3; i++) {
      const imageData = formData.get(`image${i}`);
      if (imageData) {
        const result = await cloudinary.uploader.upload(imageData as string, {
          folder: 'product-images',
        });
        updatedImageUrls.push({ imageUrl: result.secure_url, publicUrl: result.public_id });
      } else if (existingImages[i]) {
        updatedImageUrls.push(existingImages[i]);
        imagesToDelete.splice(imagesToDelete.findIndex(img => img.productImageId === existingImages[i].productImageId), 1);
      }
    }

    for (const image of imagesToDelete) {
      await cloudinary.uploader.destroy(image.publicUrl);
    }

    await prisma.product.update({
      where: { productId },
      data: {
        name,
        description,
        weight,
        priceRange,
        productCategoryId,
        productSubCategoryId,
        stock,
        slug,
        smallDescription,
        ProductImages: {
          deleteMany: {},
          create: updatedImageUrls,
        },
      },
    });

    revalidatePath("/dashboard/inventory");
    return { message: "Product updated successfully" };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      message: "Database Error: Failed to Update Product.",
    };
  }
}

type UpdateOrderState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message: string | null;
};

export async function deleteProduct(productId: string) {
  try {
    await prisma.productImage.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.product.delete({
      where: {
        productId: productId,
      },
    });

    revalidatePath("/dashboard/inventory");
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      message: "Database Error: Failed to Delete Product.",
    };
  }
}


export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({
      where: {
        orderId: id,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: " + error,
    };
  }
  revalidatePath("/dashboard/submissions");
}

export async function updateOrder(
  prevState: UpdateOrderState,
  formData: FormData
): Promise<UpdateOrderState> {
  const orderId = formData.get("orderId") as string;
  const cartItems = Array.from(formData.entries())
    .filter(([key]) => key.startsWith("finalPrice-"))
    .map(([key, value]) => ({
      cartItemId: key.split("-")[1],
      finalPrice: Number(value),
    }));

  const validatedFields = z
    .array(
      z.object({
        cartItemId: z.string(),
        finalPrice: z.number().positive(),
      })
    )
    .safeParse(cartItems);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update order.",
    };
  }

  try {
    for (const item of validatedFields.data) {
      const cartItem = await prisma.cartItem.findUnique({
        where: { cartItemId: item.cartItemId },
        select: { quantity: true },
      });

      if (!cartItem) {
        throw new Error(`Cart item with id ${item.cartItemId} not found`);
      }

      const finalPricePerItem = Math.floor(item.finalPrice / cartItem.quantity);

      await prisma.cartItem.update({
        where: { cartItemId: item.cartItemId },
        data: {
          finalPrice: finalPricePerItem,
        },
      });
    }

    const order = await prisma.order.findUnique({
      where: { orderId },
      include: { cart: { include: { items: true } } },
    });

    if (order) {
      const updatedTotalPrice = order.cart.items.reduce(
        (sum, item) => sum + (item.finalPrice || 0) * item.quantity,
        0
      );

      await prisma.order.update({
        where: { orderId },
        data: {
          totalPrice: updatedTotalPrice,
          status: "AWAITING_PAYMENT",
          updatedAt: new Date(),
          estimated: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
    }

    revalidatePath("/dashboard/submissions");
    return { message: "Order updated successfully." };
  } catch (error) {
    return {
      message:
        "Database Error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function setOrderStatusToProduction(
  orderId: string,
  estimatedTime: number
) {
  try {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + estimatedTime);

    await prisma.order.update({
      where: { orderId },
      data: {
        status: "PRODUCTION_IN_PROGRESS",
        updatedAt: new Date(),
        estimated: estimatedDate,
      },
    });

    revalidatePath("/dashboard/production");
    return { message: "Order status updated to production successfully." };
  } catch (error) {
    return {
      message:
        "Database Error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function setOrderStatusToProductionCompleted(orderId: string) {
  try {
    await prisma.order.update({
      where: { orderId },
      data: {
        status: "ON_DELIVERY",
        updatedAt: new Date(),
        estimated: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    revalidatePath("/dashboard/production");
    return {
      message: "Order status updated to production completed successfully.",
    };
  } catch (error) {
    return {
      message:
        "Database Error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function setOrderStatusToOnDelivery(
  orderId: string,
  estimatedTime: number
) {
  try {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + estimatedTime);

    await prisma.order.update({
      where: { orderId },
      data: {
        shippingStatus: "ON_DELIVERY",
        status: "ON_DELIVERY",
        updatedAt: new Date(),
        estimated: estimatedDate,
      },
    });

    revalidatePath("/dashboard/shipping");
    return { message: "Order status updated to on delivery successfully." };
  } catch (error) {
    return {
      message:
        "Database Error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function setOrderStatusToDelivered(orderId: string) {
  try {
    await prisma.order.update({
      where: { orderId },
      data: {
        status: "DELIVERED",
        shippingStatus: "DELIVERED",
        updatedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/shipping");
    revalidatePath("/account-order");
    return { message: "Order status updated to delivered successfully." };
  } catch (error) {
    return {
      message:
        "Database Error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}
