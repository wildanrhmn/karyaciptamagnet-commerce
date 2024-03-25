"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { useState } from "react";
import { IUser } from "../../../../../../@types/definition";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
export interface IFormManageBiodata {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  image: string;
}

export default function ManageAccount({ profile }: { profile: IUser }) {
  const [imagePreview, setImagePreview] = useState<string>(profile?.image?.url);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormManageBiodata>();

  const onSubmit: SubmitHandler<IFormManageBiodata> = async (data) =>
    console.info(data);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <form className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profil Publik</h2>

          <div className="mx-auto mt-8 grid max-w-2xl">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <div className="relative h-32 w-32">
                <Image
                  className="rounded-full object-cover p-1 ring-2 ring-blue-600 dark:ring-primary"
                  src={imagePreview}
                  alt="Bordered avatar"
                  fill
                />
              </div>
              <div className="flex flex-col space-y-5 sm:ml-8">
                <div className="relative rounded-lg border border-primary cursor-pointer bg-primary px-7 py-3.5 text-base font-medium text-white hover:bg-[#418ab8] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200">
                  Ganti Foto
                  <input
                    id="image"
                    type="file"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    aria-describedby="image-error"
                    {...register("image")}
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-primary bg-white px-7 py-3.5 text-base font-medium text-black hover:bg-gray-100 hover:text-[#202142] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200 "
                >
                  Hapus Foto
                </button>
              </div>
            </div>

            <div className="mt-8 items-center text-[#202142] sm:mt-14">
              <div className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-black dark:text-black"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="block w-full rounded-lg border border-primary bg-gray-100 p-2.5 text-sm text-black outline-none"
                    placeholder="Masukan username"
                    defaultValue={profile?.username}
                    {...register("username", {minLength: 6, maxLength: 20})}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-black dark:text-black"
                  >
                    Password <span className="text-xs text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="block w-full rounded-lg border border-primary bg-gray-100 p-2.5 text-sm text-black outline-none"
                    placeholder="Masukan password"
                    {...register("password", {required: true})}
                  />
                </div>
              </div>
              <div className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="mb-2 block text-sm font-medium text-black dark:text-black"
                  >
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="block w-full rounded-lg border border-primary bg-gray-100 p-2.5 text-sm text-black outline-none"
                    placeholder="Masukan nama depan"
                    defaultValue={profile?.name.split(" ")[0]}
                    {...register("firstName", {minLength: 6, maxLength: 20})}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="mb-2 block text-sm font-medium text-black dark:text-black"
                  >
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="block w-full rounded-lg border border-primary bg-gray-100 p-2.5 text-sm text-black outline-none"
                    placeholder="Masukan nama belakang"
                    defaultValue={profile?.name.split(" ")[1]}
                    {...register("lastName", {minLength: 6, maxLength: 20})}
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black dark:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border border-primary bg-gray-300 p-2.5 text-sm text-black  outline-none"
                  placeholder="Masukan email"
                  defaultValue={profile?.email}
                  disabled
                />
              </div>
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="no_handphone"
                  className="mb-2 block text-sm font-medium text-black dark:text-black"
                >
                  No. Handphone
                </label>
                <input
                  type="text"
                  id="no_handphone"
                  className="block w-full rounded-lg border border-primary bg-gray-100 p-2.5 text-sm text-black outline-none"
                  placeholder="Masukan nomor handphone"
                  defaultValue={profile?.phoneNumber}
                  {...register("phone", {minLength: 10, maxLength: 12})}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full rounded-lg  bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-primary dark:hover:bg-[#418ab8] sm:w-auto"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
