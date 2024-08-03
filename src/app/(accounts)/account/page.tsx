import React from "react";
import AccountForm from "./FormAccount";
import { auth } from "@/auth/auth";
import { prisma } from "@/lib/db/prisma";

async function getUser(id: string) {
  try {
    if (!id) {
      return null
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        username: true,
        image: true,
        gender: true,
        dateOfBirth: true,
        about: true,
        email: true,
        phoneNumber: true,
        fullAddress: true,
        province: true,
        city: true,
      }
    });

    if (!user) {
      return null
    }
    
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export default async function AccountPage() {
  const session = await auth();
  const user = await getUser(session?.user?.id);

  let parsedUser = user;
  if (user && user.image) {
    try {
      parsedUser = {
        ...user,
        image: JSON.parse(user.image)
      };
    } catch (error) {
      console.error("Error parsing user image:", error);
    }
  }

  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Informasi Akun
        </h2>
        <AccountForm user={parsedUser} />
      </div>
    </div>
  );
};