"use client";

import { Icon } from "@iconify/react";
import { SetActiveAddress } from "@/lib/action";

import Dialog from "./Dialog";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function AddressesList({
  data,
  addressData,
}: {
  data: any[];
  addressData: any[];
}) {
  return (
    <div className="mx-auto mt-8 grid max-w-2xl">
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_2"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="inline-flex flex-shrink-0 items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#418ab8] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + Tambah Alamat
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {addressData && addressData.length > 0 ? (
          addressData.map((data) => (   
          <div className="w-full" key={data.id}>
            <div className={clsx("flex flex-col justify-between rounded-xl border border-primary bg-opacity-60 p-4 leading-normal", {
              "bg-primary" : data.isActive
            })}>
              <div className="mb-4">
                <div className="flex items-center gap-1">
                  {data.addressTo === "Rumah" &&  <Icon icon="ic:baseline-home" className="h-5 w-5" /> }
                  {data.addressTo === "Kantor" &&  <Icon icon="vaadin:office" className="h-5 w-5" /> }
                  <p className="flex items-center text-sm text-gray-600">{data.addressTo}</p>
                </div>
                <div className="mb-2 mt-3 flex flex-col gap-1 text-xl font-bold text-gray-900">
                  {data.user?.name}
                  <span className="text-sm text-gray-600">+62 {data.user?.phoneNumber}</span>
                </div>
                <p className="text-base text-gray-700">
                  {`${data.province?.name}, ${data.city?.name}. ${data.fullAddress}`}
                </p>
              </div>
              <div className="flex justify-start">
                {data.isActive ? (
                  <Icon
                    icon="material-symbols:check"
                    className="h-11 w-11 text-primary"
                  />
                ) : (
                  <button
                    onClick={() => {
                      SetActiveAddress(data.id)
                      .then((res) => {
                        if (res.success) {
                          toast.success(res.message);
                        } else {
                          toast.error(res.message);
                        }
                      })
                    }}
                    className="w-max items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#418ab8] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Aktifkan Alamat
                  </button>
                )}
              </div>
            </div>
          </div>
          ))
        ) : (
          <p>Tidak ada alamat</p>
        )}
      </div>
      <Dialog data={data} />
    </div>
  );
}
