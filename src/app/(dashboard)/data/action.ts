"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type UpdateOrderState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message: string | null;
};

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
          status: 'AWAITING_PAYMENT',
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

export async function setOrderStatusToProduction(orderId: string, estimatedTime: number) {
  try {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + estimatedTime);

    await prisma.order.update({
      where: { orderId },
      data: { 
        status: 'PRODUCTION_IN_PROGRESS',
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
        status: 'ON_DELIVERY',
        updatedAt: new Date(),
        estimated: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    revalidatePath("/dashboard/production");
    return { message: "Order status updated to production completed successfully." };
  } catch (error) {
    return {
      message:
        "Database Error: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function setOrderStatusToOnDelivery(orderId: string, estimatedTime: number) {
  try {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + estimatedTime);

    await prisma.order.update({
      where: { orderId },
      data: { 
        shippingStatus: 'ON_DELIVERY',
        status: 'ON_DELIVERY',
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
        status: 'DELIVERED',
        shippingStatus: 'DELIVERED',
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


