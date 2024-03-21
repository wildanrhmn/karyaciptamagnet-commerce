"use server";

import bcrypt from "bcrypt";

import { IFormRegisterInput } from "@/app/auth/signup/RegisterForm";
import { IFormLoginInput } from "@/app/auth/signin/LoginForm";

import { AuthError } from "next-auth";
import { prisma } from "./db/prisma";
import { signIn } from "@/auth";

export async function SignInAction(formData: IFormLoginInput) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, message: 'Invalid email or password' };
                default:
                    return { success: false, message: 'Unknown error.' };
            }
        }
    }
    return { success: true, message: 'Successfully logged in.' };
}

export async function SignUpAction(formData: IFormRegisterInput) {
    const { username, password, email, phone } = formData;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                phoneNumber: phone
            }
        })
            .then(async () => {
                const credentials = {
                    email,
                    password
                }
                await signIn('credentials', credentials);
            });
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unknown error.' };
        }
    return { success: true, message: 'Successfully registered.' }
}