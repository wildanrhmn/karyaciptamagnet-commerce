import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import { lusitana } from '../../components/Fonts';
import { fetchProductsPages } from '../../data/data';
import { Suspense } from 'react';
import InventoryProducts from '../../components/InventoryProducts';
import { AddProduct } from '../../components/InventoryButton';

export default async function Page(
  { searchParams } : {
  searchParams? : {
    query?: string,
    page?: string,
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Manage Inventory</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <AddProduct />
      </div>
      <Suspense key={query + currentPage} fallback={
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-md mx-auto my-4 shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }>
        <InventoryProducts query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-12 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}