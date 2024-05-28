import Image from "next/image";
import Link from "next/link";

import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";

import Hero from "@/components/ui/home/Hero";
import Feature from "@/components/ui/home/Feature";
import ProductCategory from "@/components/ui/home/ProductCategory";
import Banner from "@/components/ui/home/Banner";
import FeaturedProducts from "@/components/ui/home/FeaturedProducts";
import AboutUs from "@/components/ui/home/AboutUs";

import { getProducts, getTotalPages } from "@/lib/data";
export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page ?? 1);
  const totalPages = await getTotalPages({});
  const products = await getProducts(currentPage);

  return (
    <>
      <Hero />
      <Feature />
      <ProductCategory />
      <Banner />
      <FeaturedProducts />
      <AboutUs />
    </>
  );

  // if (products.length === 0) {
  //   return <div className="min-h-screen text-center">No products found</div>;
  // }
  // return (
  //   <div className="flex min-h-screen flex-col items-center">
  //     {currentPage === 1 && (
  //       <div className="hero rounded-xl bg-base-200">
  //         <div className="hero-content flex-col lg:flex-row">
  //           <Image
  //             src={products[0].imageUrl[0].url}
  //             alt={products[0].name}
  //             width={400}
  //             height={800}
  //             className="w-full max-w-sm rounded-lg shadow-2xl"
  //             priority
  //           />
  //           <div>
  //             <h1 className="text-5xl font-bold">{products[0].name}</h1>
  //             <p className="py-6">{products[0].description}</p>
  //             <Link
  //               href={"/products/" + products[0].id}
  //               className="btn-primary btn"
  //             >
  //               Check it out
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  //       {(currentPage === 1 ? products.slice(1) : products).map((product) => (
  //         <ProductCard product={product} key={product.id} />
  //       ))}
  //     </div>

  //     {totalPages > 1 && (
  //       <PaginationBar currentPage={currentPage} totalPages={totalPages} />
  //     )}
  //   </div>
  // );
}
