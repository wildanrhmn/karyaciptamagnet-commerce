import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import { getProductById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductById(params.id);

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: product.name + " - Karya Cipta Magnet",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl[0].url }],
    },
    twitter: {
      images: { url: product.imageUrl[0].url },
    }
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl[0].url}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
