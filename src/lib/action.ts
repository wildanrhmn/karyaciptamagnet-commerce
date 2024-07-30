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
  const { username, password, email } = formData;
  
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
          data: {
              username,
              email,
              password: hashedPassword,
          }
      });
      
      return { success: true, message: 'Successfully registered.' };
  } catch (error) {
      console.error(error);
      return { success: false, message: 'Unknown error.' };
  }
}
