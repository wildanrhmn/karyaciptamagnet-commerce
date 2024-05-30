import { Metadata } from "next";
import { TopProducts } from "@/lib/placeholder-data";
import ProductThumbnail from "@/components/ui/detailproduct/ProductThumbnail";
import ProductDescription from "@/components/ui/detailproduct/ProductDescription";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = TopProducts.find((product) => product.id === params.id);

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: product?.name + " - Karya Cipta Magnet",
    description: "",
  };
}

export default async function DetailProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = TopProducts.find((product) => product.id === params.id);

  return (
    <section className="container mx-auto px-32 py-11">
      <div className="grid grid-cols-12 gap-11">
        <div className="col-span-12 lg:col-span-5">
          <ProductThumbnail
            productImages={product?.image!}
          />
        </div>
        <div className="col-span-12 lg:col-span-7 my-1">
          <ProductDescription product={product!} />
        </div>
      </div>
    </section>
  );
}
