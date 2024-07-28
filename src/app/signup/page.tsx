"use client";

import React, { FC, useState } from "react";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignUpAction } from "@/lib/action";

const loginSocials = [
  {
    name: "Daftar dengan Google",
    icon: googleSvg,
  },
];

export interface IFormRegisterInput {
  username: string;
  password: string;
  email: string;
}

const PageSignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<IFormRegisterInput>();

  const onSubmit: SubmitHandler<IFormRegisterInput> = async (data) => {
    setIsLoading(true);
    toast.loading("Registering...");

    try {
        const result = await SignUpAction(data);
        if (result.success) {
            toast.dismiss();
            toast.success(result.message);
            
            // Sign in the user after successful registration
            const signInResult = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (signInResult?.error) {
                toast.error("Error signing in after registration");
            } else {
                router.push("/");
            }
        } else {
            toast.dismiss();
            toast.error(result.message);
        }
    } catch (error) {
        toast.dismiss();
        toast.error("An error occurred during registration");
    } finally {
        setIsLoading(false);
    }
};
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Daftar
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                onClick={() => {
                  signIn("google");
                }}
                key={index}
                className="cursor-pointer flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  sizes="40px"
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                type="text"
                placeholder="Username"
                className="mt-1"
                {...register("username", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                {...register("password", { required: true, minLength: 8 })}
              />
            </label>
            <ButtonPrimary type="submit">Daftar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Sudah punya akun? {` `}
            <Link className="text-green-600" href="/login">
              Masuk
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
