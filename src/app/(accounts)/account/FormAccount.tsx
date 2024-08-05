"use client";

import React, { useState } from "react";
import Image from "next/image";
import Label from "@/components/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import dummyImage from "@/images/avatars/Image-1.png";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateProfile } from "@/lib/action";
import { useSession } from "next-auth/react";

const AccountForm = ({ user, provinces }: { user: any; provinces: any }) => {
  const { data: session, update } = useSession();
  const [avatarPreview, setAvatarPreview] = useState(
    user?.image?.url ? user?.image?.url : dummyImage
  );
  const { register, handleSubmit, setValue } = useForm();
  const [cities, setCities] = useState([]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const {
      name,
      dateOfBirth,
      province,
      city,
      fullAddress,
      gender,
      phoneNumber,
      about,
      image,
    } = data;
    const dateObj = dateOfBirth ? new Date(dateOfBirth) : null;
    const isoDate = dateObj ? dateObj.toISOString() : null;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("dateOfBirth", isoDate || "");
    formData.append("province", province);
    formData.append("city", city);
    formData.append("fullAddress", fullAddress);
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    formData.append("about", about);
    formData.append("image", image[0]);
    formData.append("oldImage", JSON.stringify(user?.image));

    await toast.promise(UpdateProfile(formData), {
      loading: "Memperbarui profil...",
      success: (result: any) => {
        if (result && result.success) {
          update({
            name: name,
            email: result.user?.email,
            username: result.user?.username,
            scope: result.user?.scope,
            image: result.user?.image || session?.user?.image,
          });
          return result.message;
        } else {
          throw new Error(result?.message || "Gagal memperbarui profil.");
        }
      },
      error: (err) => err.message || "Gagal memperbarui profil.",
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  function formatDateForInput(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          {/* AVATAR */}
          <div className="relative rounded-full overflow-hidden flex">
            <Image
              src={avatarPreview}
              alt="avatar"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mt-1 text-xs">Ubah Foto Profil</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              {...register("image")}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label>Nama Lengkap</Label>
            <Input
              className="mt-1.5"
              {...register("name")}
              defaultValue={user?.name}
            />
          </div>

          {/* ---- */}
          <div>
            <Label>Email</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-envelope"></i>
              </span>
              <Input
                className="!rounded-l-none"
                placeholder={user?.email}
                disabled
              />
            </div>
          </div>

          {/* ---- */}
          <div className="max-w-lg">
            <Label>Tanggal Lahir</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-calendar"></i>
              </span>
              <Input
                className="!rounded-l-none"
                type="date"
                {...register("dateOfBirth")}
                defaultValue={formatDateForInput(user?.dateOfBirth)}
              />
            </div>
          </div>
          {/* ---- */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label>Provinsi</Label>
              <Select
                className="mt-1.5 w-full"
                defaultValue={user?.province?.provinceId || ""}
                {...register("province")}
                onChange={(e) => {
                  const provinceId = e.target.value;
                  const filteredCities = provinces.filter(
                    (province: any) => province.provinceId === provinceId
                  );
                  setCities(filteredCities[0].cities);
                  setValue("province", provinceId);
                }}
              >
                <option value="" disabled>
                  Pilih Provinsi
                </option>
                {provinces.map((province: any) => (
                  <option key={province.provinceId} value={province.provinceId}>
                    {province.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1">
              <Label>Kota</Label>
              <Select
                className="mt-1.5 w-full"
                defaultValue={user?.city?.cityId || ""}
                {...register("city")}
                onChange={(e) => {
                  const cityId = e.target.value;
                  setValue("city", cityId);
                }}
              >
                <option value="" disabled>
                  Pilih Kota
                </option>
                {cities.length === 0 ? (
                  <>
                    {(() => {
                      const userProvince = provinces.find(
                        (province: any) =>
                          province.provinceId === user?.province?.provinceId
                      );
                      if (userProvince && userProvince.cities) {
                        return userProvince.cities.map((city: any) => (
                          <option key={city.cityId} value={city.cityId}>
                            {city.name}
                          </option>
                        ));
                      } else {
                        return (
                          <option value="" disabled>
                            Silahkan pilih provinsi
                          </option>
                        );
                      }
                    })()}
                  </>
                ) : (
                  cities.map((city: any) => (
                    <option key={city.cityId} value={city.cityId}>
                      {city.name}
                    </option>
                  ))
                )}
              </Select>
            </div>
          </div>

          {/* ---- */}
          <div>
            <Label>Alamat Lengkap</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-map-signs"></i>
              </span>
              <Input
                className="!rounded-l-none"
                {...register("fullAddress")}
                defaultValue={user?.fullAddress}
              />
            </div>
          </div>


          {/* ---- */}
          <div>
            <Label>Jenis Kelamin</Label>
            <Select
              className="mt-1.5"
              defaultValue={user?.gender || ""}
              {...register("gender")}
              onChange={(e) => setValue("gender", e.target.value)}
            >
              <option value="" disabled>
                Pilih Jenis Kelamin
              </option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </Select>
          </div>

          {/* ---- */}
          <div>
            <Label>Nomor Telepon</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-phone-volume"></i>
              </span>
              <Input
                className="!rounded-l-none"
                {...register("phoneNumber")}
                defaultValue={user?.phoneNumber}
              />
            </div>
          </div>
          {/* ---- */}
          <div>
            <Label>Tentang Saya</Label>
            <Textarea
              className="mt-1.5"
              {...register("about")}
              defaultValue={user?.about}
            />
          </div>
          <div className="pt-2">
            <ButtonPrimary>Update Akun</ButtonPrimary>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
