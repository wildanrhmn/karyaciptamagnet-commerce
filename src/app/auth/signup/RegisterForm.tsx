"use client";

import toast from "react-hot-toast";

import { Icon } from "@iconify/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpAction } from "@/lib/action";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export interface IFormRegisterInput {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormRegisterInput>();
  const onSubmit: SubmitHandler<IFormRegisterInput> = async(data) => {
    const result: any = await SignUpAction(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      return toast.error(result.message);
    }

    reset();
    router.push("/store");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6 max-md:mx-auto md:ml-auto"
    >
      <h3 className="mb-8 text-3xl font-extrabold max-md:text-center">
        Daftar
      </h3>
      <div className="relative">
        {errors.username && (
          <span className="text-sm text-red-500">
            {errors.username.type === "required" && "*Username dibutuhkan"}
            {errors.username.type === "minLength" && "*Username minimal 6 karakter"}
            {errors.username.type === "maxLength" && "*Username maksimal 20 karakter"}
          </span>
        )}
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md bg-gray-100 px-4 py-3.5 pl-10 text-sm outline-blue-600"
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
          <Icon
            icon="ion:person"
            className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          />
        </div>
      </div>
      <div className="relative">
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.type === "required" && "*Password dibutuhkan"}
            {errors.password.type === "minLength" && "*Username minimal 6 karakter"}
            {errors.password.type === "maxLength" && "*Username maksimal 20 karakter"}
          </span>
        )}
        <div className="relative">
          <input
            type="password"
            className="w-full rounded-md bg-gray-100 px-4 py-3.5 pl-10 text-sm outline-blue-600"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
          <Icon
            icon="mdi:password"
            className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          />
        </div>
      </div>
      <div className="relative">
        {errors.email && (
          <span className="text-sm text-red-500">
            {errors.email.type === "required" && "*Email dibutuhkan"}
            {errors.email.type === "pattern" && errors.email.message}
          </span>
        )}
        <div className="relative">
          <input
            type="email"
            className="w-full rounded-md bg-gray-100 px-4 py-3.5 pl-10 text-sm outline-blue-600"
            placeholder="Alamat Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "*Masukan email sesuai format email",
              },
            })}
          />
          <Icon
            icon="ic:round-email"
            className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          />
        </div>
      </div>
      <div className="relative">
        {errors.phone && (
          <span className="text-sm text-red-500">
            {errors.phone.type === "required" && "*No. Handphone dibutuhkan"}
            {errors.phone.type === "minLength" && "*No. Handphone minimal 10 karakter"}
            {errors.phone.type === "maxLength" && "*No. Handphone maksimal 12 karakter"}
          </span>
        )}
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md bg-gray-100 px-4 py-3.5 pl-20 text-sm outline-blue-600"
            placeholder="No Handphone"
            {...register("phone", {
              required: true,
              minLength: 10,
              maxLength: 12,
            })}
          />
          <div className="absolute left-5 top-0 flex h-full w-10 items-center justify-center gap-1">
            <Icon
              icon="openmoji:flag-indonesia"
              className="h-[20px] w-[20px] flex-shrink-0"
            />
            <span className="text-sm">+62</span>
          </div>
        </div>
      </div>
      <div className="!mt-10">
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none"
        >
          Daftar
        </button>
      </div>
      <div className="flex items-center justify-center gap-7">
        <hr className="w-full" />
        <p className="flex-shrink-0 text-center text-sm text-gray-400">
          atau daftar dengan
        </p>
        <hr className="w-full" />
      </div>
      <div className="flex justify-center space-x-6">
        <button onClick={() => signIn("google")} type="button" className="border-none outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            className="inline"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fbbd00"
              d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
              data-original="#fbbd00"
            />
            <path
              fill="#0f9d58"
              d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
              data-original="#0f9d58"
            />
            <path
              fill="#31aa52"
              d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
              data-original="#31aa52"
            />
            <path
              fill="#3c79e6"
              d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
              data-original="#3c79e6"
            />
            <path
              fill="#cf2d48"
              d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
              data-original="#cf2d48"
            />
            <path
              fill="#eb4132"
              d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
              data-original="#eb4132"
            />
          </svg>
        </button>
        <button type="button" className="border-none outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            fill="#007bff"
            viewBox="0 0 167.657 167.657"
          >
            <path
              d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
              data-original="#010002"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
