"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import cloudinary from '@/lib/cloudinary';
import bcrypt from "bcrypt";
import { Buffer } from 'buffer';
import { UploadApiResponse } from 'cloudinary';

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

export type UserState = {
  errors?: {
    id?: string[];
    username?: string[];
    name?: string[];
    email?: string[];
    image?: string[];
    password?: string[];
    scope?: string[];
  };
  message?: string | null;
}; 

const UserFormSchema = z.object({
  id: z.string({
    invalid_type_error: "ID must be a string",
    required_error: "ID is required",
  }),
  username: z.string({
    invalid_type_error: "Username must be a string",
    required_error: "Username is required",
  }),
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required",
  }),
  email: z.string({
    invalid_type_error: "Email must be a string",
    required_error: "Email is required",
  }).email({ message: "Invalid email address" }),
  image: z.instanceof(File, { message: "Image must be a file" }).refine(
    (file) => ['image/png', 'image/jpeg'].includes(file.type),
    { message: 'File must be either PNG or JPG' }
  ).optional(),
  password: z.string({
    invalid_type_error: "Password must be a string",
    required_error: "Password is required",
  }),
  scope: z.string({
    invalid_type_error: "Scope must be a string",
    required_error: "Scope is required",
  }),
});

const CreateUserSchema = UserFormSchema.omit({ id: true }).extend({
  image: z.any().optional().refine(
    (file) => !file || (file instanceof Blob && ['image/png', 'image/jpeg'].includes(file.type)),
    { message: 'File must be either PNG or JPG' }
  ),
});

export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUserSchema.safeParse({
    username: formData.get('username'),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    scope: formData.get('scope'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { username, name, email, password, scope } = validatedFields.data;

  try {
    let imageData = null;
    const imageFile = formData.get('image') as File | null;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'user-images' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        ).end(buffer);
      });

      imageData = JSON.stringify({
        imageUrl: result.secure_url,
        publicUrl: result.public_id
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        name,
        email,
        emailVerified: new Date(),
        image: imageData,
        password: hashedPassword,
        scope,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

const UpdateUserSchema = UserFormSchema.extend({
  id: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  scope: z.string().optional(),
  image: z.any().optional().refine(
    (file) => !file || (file instanceof Blob && ['image/png', 'image/jpeg'].includes(file.type)),
    { message: 'File must be either PNG or JPG' }
  ),
});

export async function updateUser(prevState: any, formData: FormData) {
  const validatedFields = UpdateUserSchema.safeParse({
    id: formData.get('id'),
    username: formData.get('username') || undefined,
    name: formData.get('name') || undefined,
    email: formData.get('email') || undefined,
    password: formData.get('password') || undefined,
    scope: formData.get('scope') || undefined,
    image: formData.get('image') || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Failed. Please check your inputs.',
    };
  }

  const { id, ...updateFields } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { image: true }
    });

    let imageData = null;
    const imageFile = formData.get('image') as File | null;
    if (imageFile) {
      if (user?.image) {
        const oldImageData = JSON.parse(user.image);
        await cloudinary.uploader.destroy(oldImageData.publicUrl);
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'user-images' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        ).end(buffer);
      });

      imageData = JSON.stringify({
        imageUrl: result.secure_url,
        publicUrl: result.public_id
      });
    }

    const updateData: any = {};

    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        if (key === 'password') {
          updateData[key] = await bcrypt.hash(value as string, 10);
        } else if (key === 'image') {
          if (imageData) {
            updateData[key] = imageData;
          }
        } else {
          updateData[key] = value;
        }
      }
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update User.',
    };
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}


export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true }
    });

    if (user?.image) {
      const imageData = JSON.parse(user.image);
      await cloudinary.uploader.destroy(imageData.publicUrl);
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete User.",
    };
  }
  revalidatePath('/dashboard/users');
}


