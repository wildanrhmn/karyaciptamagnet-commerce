import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import ShippingTable from '../../components/ShippingTable';
import { lusitana } from '../../components/Fonts';
import { InvoicesTableSkeleton } from '../../components/Skeletons';
import { Suspense } from 'react';
import { fetchShippingPages } from '../../data/data';
 
export default async function Page(
  { searchParams } : {
  searchParams? : {
    query?: string,
    page?: string,
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchShippingPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Daftar Pengiriman</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cari pengiriman..." />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <ShippingTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}