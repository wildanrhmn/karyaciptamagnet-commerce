import { fetchFilteredProducts } from "../data/data";
import ProductCard from "./ProductCard";
import { Package } from "lucide-react";

export default async function InventoryProducts({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);
  return (
    <div className="container mx-auto px-4 mt-10">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product: any) => (
            <div key={product.productId} className="flex justify-center items-stretch">
              <ProductCard product={product} className="w-full h-auto max-w-xs" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Package className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            We couldn&apos;t find any products matching your search. Try
            adjusting your filters or adding new products.
          </p>
        </div>
      )}
    </div>
  );
}
