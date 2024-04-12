import { Metadata } from "next";

import ManageAccount from "./FormAccount";
import { getProfileById } from "@/lib/data";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

export async function generateMetadata({
  params,
} : {
  params: { id: string };
}): Promise<Metadata> {
  const session = await auth();
  const userId = session?.user.id;

  if (params.id !== userId) {
    return {
      title: "Karya Cipta Magnet - Not Found Profile",
    }
  }
  const profile = await getProfileById(params.id);
  return {
    title: `Kelola Biodata ${profile?.name} - Karya Cipta Magnet`,
    openGraph: {
      images: [{ url: profile?.image.url }],
    }
  }
}

export default async function MyAccountPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const userId = session?.user.id;

  if (params.id !== userId) {
    notFound();
  }

  const profile = await getProfileById(params.id);
  return (
      <ManageAccount profile={profile} />
  );
}
