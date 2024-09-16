import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import SubmissionsTable from '../../components/OrdersTable';
import { CreateOrder } from '../../components/Buttons';
import { lusitana } from '../../components/Fonts';
import { InvoicesTableSkeleton } from '../../components/Skeletons';
import { Suspense } from 'react';
import { fetchSubmissionsPages } from '../../data/data';
 
export default async function Page(
  { searchParams } : {
  searchParams? : {
    query?: string,
    page?: string,
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchSubmissionsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Submissions</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search submissions..." />
        <CreateOrder />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <SubmissionsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}