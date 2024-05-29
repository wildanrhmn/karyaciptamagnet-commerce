import Image from "next/image";
import Link from "next/link";
import { TopProducts } from "@/lib/placeholder-data";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
  return (
    <div className="container mx-auto py-16">
      <h2 className="mb-6 text-2xl font-bold uppercase text-gray-800">
        PRODUK TERLARIS
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {TopProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
}
