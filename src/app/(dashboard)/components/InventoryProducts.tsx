import {
  fetchFilteredProducts,
  fetchCategories,
  fetchSubCategories,
} from "../data/data";
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
  const [categories, subCategories] = await Promise.all([
    fetchCategories(),
    fetchSubCategories(),
  ]);
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
          {products.map((item, index) => (
            <ProductCard
              product={item}
              productCategories={categories}
              productSubCategories={subCategories}
              key={index}
            />
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
