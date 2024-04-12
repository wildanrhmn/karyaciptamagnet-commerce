"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import { UpdateProfile } from "@/lib/action";
import { useState } from "react";
import { IUser } from "../../../../../../@types/definition";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
export interface IFormManageBiodata {
  username: string;
  fullName: string;
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

  const onSubmit: SubmitHandler<IFormManageBiodata> = async (data) => {
    const { username, fullName, phone, image } = data;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("image", image[0]);
    formData.append("oldImage", JSON.stringify(profile?.image));

    const result: any = await UpdateProfile(formData);
    if (result.success) {
      toast.success(result.message);
    }
    if (!result.success) {
      toast.error(result.message);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4"
    >
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
                <div className="relative cursor-pointer rounded-lg border border-primary bg-primary px-7 py-3.5 text-base font-medium text-white hover:bg-[#418ab8] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200">
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
              <div className="mb-6 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="mb-4 w-full sm:mb-0">
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-black dark:text-black"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      className="block w-full rounded-lg border border-primary bg-gray-100 py-2 pl-10 text-sm text-black outline-none"
                      placeholder="Masukan username"
                      defaultValue={profile?.username}
                      {...register("username", { minLength: 6, maxLength: 20 })}
                    />
                    <Icon
                      icon="mdi:user"
                      className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary"
                    />
                  </div>
                  <div
                    id="username-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errors.username && (
                      <span className="text-sm text-red-500">
                        {errors.username.type === "minLength" &&
                          "*Minimal 6 karakter"}
                        {errors.username.type === "maxLength" &&
                          "*Maksimal 20 karakter"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-black dark:text-black"
                  >
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      className="block w-full rounded-lg border border-primary bg-gray-100 py-2 pl-10 text-sm text-black outline-none"
                      placeholder="Masukan nama lengkap"
                      defaultValue={profile?.name}
                      {...register("fullName", {
                        minLength: 6,
                        maxLength: 20,
                      })}
                    />
                    <Icon
                      icon="icon-park-solid:edit-name"
                      className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary"
                    />
                  </div>
                  <div
                    id="fullName-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errors.fullName && (
                      <span className="text-sm text-red-500">
                        {errors.fullName.type === "minLength" &&
                          "*Minimal 6 karakter"}
                        {errors.fullName.type === "maxLength" &&
                          "*Maksimal 20 karakter"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-6 sm:mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black dark:text-black"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-primary bg-gray-300 py-2 pl-10 text-sm text-black outline-none  disabled:cursor-not-allowed"
                    placeholder="Masukan email"
                    defaultValue={profile?.email}
                    disabled
                  />
                  <Icon
                    icon="ic:baseline-email"
                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary"
                  />
                </div>
              </div>
              <div className="mb-6 sm:mb-6">
                <label
                  htmlFor="no_handphone"
                  className="mb-2 block text-sm font-medium text-black dark:text-black"
                >
                  No. Handphone
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-primary bg-gray-100 py-2 pl-20 text-sm text-black outline-none"
                    placeholder="Masukan nomor handphone"
                    defaultValue={profile?.phoneNumber}
                    {...register("phone", {
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

                <div id="phone-error" aria-live="polite" aria-atomic="true">
                  {errors.phone && (
                    <span className="text-sm text-red-500">
                      {errors.phone.type === "minLength" &&
                        "*Minimal 10 karakter"}
                      {errors.phone.type === "maxLength" &&
                        "*Maksimal 12 karakter"}
                    </span>
                  )}
                </div>
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
