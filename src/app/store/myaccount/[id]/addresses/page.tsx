import { getProfileById, getPronvinces, getUserAddresses } from "@/lib/data";
import { Metadata } from "next";
import AddressesList from "./AddressesList";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const profile = await getProfileById(params.id);
  return {
    title: `Kelola Alamat ${profile?.name} - Karya Cipta Magnet`,
    openGraph: {
      images: [{ url: profile?.image.url }],
    },
  };
}

export default async function AddressesListPage({
  params,
}: {
  params: { id: string };
}) {
  const provinces = await getPronvinces();
  const profile = await getUserAddresses({ userId: params.id });
  return (
    <div className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Daftar Alamat</h2>
        </div>
        <AddressesList data={provinces} addressData={profile} />
      </div>
    </div>
  );
}
