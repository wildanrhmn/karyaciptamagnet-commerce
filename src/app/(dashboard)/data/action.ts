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
        finalPrice: z.number().int().positive(),
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
      await prisma.cartItem.update({
        where: { cartItemId: item.cartItemId },
        data: { finalPrice: item.finalPrice },
      });
    }

    const order = await prisma.order.findUnique({
      where: { orderId },
      include: { cart: { include: { items: true } } },
    });

    if (order) {
      const updatedTotalPrice = order.cart.items.reduce(
        (sum, item) => sum + (item.finalPrice || 0),
        0
      );

      await prisma.order.update({
        where: { orderId },
        data: { totalPrice: updatedTotalPrice },
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
