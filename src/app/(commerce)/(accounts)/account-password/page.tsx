"use client";

import React from "react";
import Label from "@/components/Label/Label";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { UpdatePassword } from "@/lib/action";

const AccountPass = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<any> = async (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("Kata sandi baru dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    await toast.promise(UpdatePassword(formData), {
      loading: "Memperbarui kata sandi...",
      success: (result: any) => {
        if (result && result.success) {
          return result.message;
        } else {
          throw new Error(result?.message || "Gagal memperbarui kata sandi.");
        }
      },
      error: (err) => err.message || "Gagal memperbarui kata sandi.",
    });
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Perbarui kata sandi Anda
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
        <div>
          <Label>Kata sandi saat ini</Label>
          <Input 
            type="password" 
            className="mt-1.5" 
            {...register("currentPassword", { required: "Kata sandi saat ini wajib diisi" })}
          />
          {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message as string}</span>}
        </div>
        <div>
          <Label>Kata sandi baru</Label>
          <Input 
            type="password" 
            className="mt-1.5" 
            {...register("newPassword", { 
              required: "Kata sandi baru wajib diisi",
              minLength: { value: 8, message: "Kata sandi harus minimal 8 karakter" }
            })}
          />
          {errors.newPassword && <span className="text-red-500">{errors.newPassword.message as string}</span>}
        </div>
        <div>
          <Label>Konfirmasi kata sandi</Label>
          <Input 
            type="password" 
            className="mt-1.5" 
            {...register("confirmPassword", { 
              required: "Konfirmasi kata sandi wajib diisi",
              validate: (value) => value === newPassword || "Kata sandi tidak cocok"
            })}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message as string}</span>}
        </div>
        <div className="pt-2">
          <ButtonPrimary type="submit">Perbarui kata sandi</ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AccountPass;