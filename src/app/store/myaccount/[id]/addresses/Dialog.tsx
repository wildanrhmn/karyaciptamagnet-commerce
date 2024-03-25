"use client";

import toast from "react-hot-toast";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { CreateNewAddress } from "@/lib/action";
export interface IFormContactInput {
  provinceId: string;
  cityId: string;
  addressTo: string;
  fullAddress: string;
}
export default function Dialog({ data }: { data: any[] }) {
  const [cities, setCities] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormContactInput>();

  const onSubmit: SubmitHandler<IFormContactInput> = async (data) => {
    const dialog = document.querySelector("#my_modal_2") as HTMLDialogElement;
    const result: any = await CreateNewAddress(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      return toast.error(result.message);
    }
    reset();
    dialog.close();
  };
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="mb-8 text-lg font-bold">Tambahkan alamat baru</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-backdrop text-black"
        >
          <div className="mb-4">
            <label
              htmlFor="addressTo"
              className="mb-2 block text-sm font-medium"
            >
              Titik tujuan
            </label>
            <div className="relative">
              <select
                id="addressTo"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                {...register("addressTo", {
                  required: true,
                })}
              >
                <option value="" disabled>
                  Pilih titik tujuan
                </option>
                <option value="Rumah">Rumah</option>
                <option value="Kantor">Kantor</option>
              </select>
              <Icon
                icon="mdi:address-marker"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
            <div id="addressTo-error" aria-live="polite" aria-atomic="true">
              {errors.addressTo && (
                <span className="text-sm text-red-500">
                  {errors.addressTo.type === "required" && "*Tujuan dibutuhkan"}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="provinceId"
              className="mb-2 block text-sm font-medium"
            >
              Pilih Provinsi
            </label>
            <div className="relative">
              <select
                id="provinceId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                {...register("provinceId", {
                  required: true,
                })}
                onChange={(e) => {
                  const provinceId = e.target.value;
                  const filteredCities = data.filter(
                    (province: any) => province.id === provinceId
                  );
                  setCities(filteredCities[0].cities);
                }}
              >
                <option value="" disabled>
                  Pilih provinsi
                </option>
                {data.map((province: any) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <Icon
                icon="solar:city-bold"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
            <div id="provinceId-error" aria-live="polite" aria-atomic="true">
              {errors.provinceId && (
                <span className="text-sm text-red-500">
                  {errors.provinceId.type === "required" &&
                    "*Provinsi Dibutuhkan"}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="cityId" className="mb-2 block text-sm font-medium">
              Pilih Kota
            </label>
            <div className="relative">
              <select
                id="cityId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                defaultValue=""
                disabled={cities.length === 0}
                {...register("cityId", {
                  required: true,
                })}
              >
                <option value="" disabled>
                  Pilih kota
                </option>
                {cities.map((city: any) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <Icon
                icon="solar:city-outline"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
              />
            </div>
            <div id="cityId-error" aria-live="polite" aria-atomic="true">
              {errors.cityId && (
                <span className="text-sm text-red-500">
                  {errors.cityId.type === "required" && "*Kota dibutuhkan"}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="fullAddress"
              className="text-dark block text-sm font-medium"
            >
              Detail Alamat
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="fullAddress"
                  placeholder="Masukan detail alamat..."
                  className="peer block h-32 w-full resize-none rounded-md border border-gray-200 px-2 py-2 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="firstName-error"
                  {...register("fullAddress", {
                    required: true,
                    minLength: 20,
                  })}
                />
              </div>
              {errors.fullAddress && (
                <span className="text-sm text-red-500">
                  {errors.fullAddress.type === "required" &&
                    "*Detail alamat dibutuhkan"}
                  {errors.fullAddress.type === "minLength" &&
                    "*Minimal 20 karakter"}
                </span>
              )}
            </div>
          </div>

          <div className="">
              <button className="bg-primary px-6 py-3 rounded-md text-white text-sm hover:bg-primary/90 transition-all duration-150" type="submit">Simpan</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => reset()}>close</button>
      </form>
    </dialog>
  );
}
