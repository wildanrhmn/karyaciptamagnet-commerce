"use server";

import bcrypt from "bcrypt";
import cloudinary from "./cloudinary";

import { IFormLoginInput } from "@/app/login/page";
import { IFormRegisterInput } from "@/app/signup/page";

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
