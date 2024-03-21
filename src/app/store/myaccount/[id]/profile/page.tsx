import { Metadata } from "next";

import ManageAccount from "./FormAccount";
import { getProfileById } from "@/lib/data";

export async function generateMetadata({
  params,
} : {
  params: { id: string };
}): Promise<Metadata> {
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
  const profile = await getProfileById(params.id);
  return (
      <ManageAccount profile={profile} />
  );
}
