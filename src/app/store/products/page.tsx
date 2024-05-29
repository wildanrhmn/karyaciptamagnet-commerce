import CategorySidebar from "@/components/ui/products/SideCategory";
import ProductCard from "@/components/ProductCard";
import { TopProducts } from "@/lib/placeholder-data";
export default async function ProductPage() {
  return (
    <section className="container mx-auto px-32 py-11">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-3">
          <CategorySidebar />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <h5 className="text-xl font-bold mb-3">All Products</h5>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TopProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
