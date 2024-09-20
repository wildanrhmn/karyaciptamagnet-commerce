"use server";

import bcrypt from "bcrypt";
import cloudinary from "./cloudinary";

import { IFormLoginInput } from "@/app/(commerce)/login/page";
import { IFormRegisterInput } from "@/app/(commerce)/signup/page";

import { AuthError } from "next-auth";
import { prisma } from "./db/prisma";
import { signIn, auth } from "@/auth/auth";

import { revalidatePath } from "next/cache";

export async function SignInAction(formData: IFormLoginInput) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password" };
        default:
          return { success: false, message: "Invalid email or password" };
      }
    }
  }
  return { success: true, message: "Successfully logged in." };
}

export async function SignUpAction(formData: IFormRegisterInput) {
  const { fullName, password, email } = formData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, message: "Successfully registered." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error." };
  }
}

export async function UpdateProfile(formData: FormData) {
  const session = await auth();

  const id = session?.user.id;

  const name = formData.get("name") as string || null;
  const dateOfBirth = formData.get("dateOfBirth") as string || null;
  const province = formData.get("province") as string || null;
  const city = formData.get("city") as string || null;
  const fullAddress = formData.get("fullAddress") as string || null;
  const gender = formData.get("gender") as string || null;
  const phoneNumber = formData.get("phoneNumber") as string || null;
  const about = formData.get("about") as string || null;
  const image = formData.get("image") as File || null;
  const oldImage = formData.get("oldImage") ? JSON.parse(formData.get("oldImage") as string) : null;

  let imageData: any = null;
  if (image) {
    if (typeof image === "string") {
      imageData = JSON.stringify(oldImage);
    } else {
      imageData = await uploadImage(image).then((result: any) => {
        return JSON.stringify({
          url: result.url,
          public_id: result.public_id,
        });
      });
    }
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        dateOfBirth,
        fullAddress,
        provinceId: province,
        cityId: city,
        gender,
        phoneNumber,
        about,
        image: imageData,
        updatedAt: new Date(),
      },
    });
    if (oldImage && oldImage.public_id !== null) {
      await cloudinary.uploader.destroy(oldImage.public_id);
    }
    revalidatePath("/account");
    return { success: true, message: `Berhasil memperbarui profil.`, user: user };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui profil." };
  }
}

async function uploadImage(data: File) {
  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "karyaciptamagnet/user_pictures" },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
}

export async function UpdatePassword(formData: FormData) {
  const session = await auth();
  const id = session?.user.id;

  const currentPassword = formData.get("currentPassword") as string || null;
  const newPassword = formData.get("newPassword") as string || null;
  const confirmPassword = formData.get("confirmPassword") as string || null;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    if (!currentPassword || !(await bcrypt.compare(currentPassword, user.password!))) {
      return { success: false, message: "Current password is incorrect." };
    }

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      return { success: false, message: "New password and confirm password do not match." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Berhasil memperbarui kata sandi." };
  } catch (error) {
    return { success: false, message: "Gagal memperbarui kata sandi." };
  }
}

export async function AddToCart(productId: string, userId: string, quantity: number = 1, customization: string = "") {
  try {
    let cart = await prisma.cart.findFirst({
      where: { userId, status: "ORDER_DRAFT" },
    });

    if (!cart) {
      const existingOrderCreatedCart = await prisma.cart.findFirst({
        where: { userId, status: "ORDER_CREATED" },
      });

      if (existingOrderCreatedCart) {
        cart = await prisma.cart.create({
          data: { userId, status: "ORDER_DRAFT" },
        });
      } else {
        cart = await prisma.cart.create({
          data: { userId, status: "ORDER_DRAFT" },
        });
      }
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.cartId,
        productId,
      },
    });

    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { cartItemId: existingCartItem.cartItemId },
        data: { 
          quantity: existingCartItem.quantity + quantity,
          customization: customization || existingCartItem.customization
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          productId,
          quantity,
          customization,
        },
      });
    }

    // Fetch the updated cart with items
    const updatedCart = await prisma.cart.findUnique({
      where: { cartId: cart.cartId },
      include: { items: { include: { product: true } } },
    });

    revalidatePath("/cart");

    return { success: true, message: "Berhasil menambahkan produk ke keranjang", cart: updatedCart };
  } catch (error) {
    console.error("Gagal menambahkan produk ke keranjang:", error);
    return { success: false, message: "Gagal menambahkan produk ke keranjang" };
  }
}

export async function RemoveFromCart(cartItemId: string) {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItemId },
      include: { cart: true }
    });

    if (!cartItem) {
      return { success: false, message: "Item keranjang tidak ditemukan" };
    }

    await prisma.cartItem.delete({
      where: { cartItemId }
    });

    const remainingItems = await prisma.cartItem.count({
      where: { cartId: cartItem.cartId }
    });

    if (remainingItems === 0) {
      await prisma.cart.delete({
        where: { cartId: cartItem.cartId }
      });
    }

    revalidatePath("/cart");

    return { success: true, message: "Berhasil menghapus produk dari keranjang" };
  } catch (error) {
    console.error("Gagal menghapus produk dari keranjang:", error);
    return { success: false, message: "Gagal menghapus produk dari keranjang" };
  }
}

export async function createOrder(cartId: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const cart = await prisma.cart.findUnique({
      where: { cartId },
      include: { items: true },
    });

    if (!cart) {
      throw new Error("Cart not found or doesn't belong to the user");
    }

    const order = await prisma.order.create({
      data: {
        userId,
        cartId,
        status: "AWAITING_PRICE",
        totalPrice: 0,
        totalWeight: 0,
        shippingStatus: "PENDING",
        shippingAddress: "",
      },
    });

    await prisma.cart.update({
      where: { cartId },
      data: { status: "ORDER_CREATED" },
    });

    revalidatePath('/cart');
    revalidatePath('/myorder');

    return { success: true, orderId: order.orderId };
  } catch (error) {
    console.error("Gagal membuat pesanan:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteOrder(orderId: string, cartId: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.order.delete({
        where: { orderId },
      });

      await prisma.cart.delete({
        where: { cartId },
      });
    });

    revalidatePath('/account-order');

    return { success: true, message: "Berhasil menghapus pesanan dan keranjang" };
  } catch (error) {
    console.error("Gagal menghapus pesanan dan keranjang:", error);
    return { success: false, error: (error as Error).message };
  }
}