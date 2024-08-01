'use client';

import { useState, useCallback } from 'react';
import { ProductList } from './ProductList';
import TabFilters from '@/components/TabFilters';
import Pagination from '@/shared/Pagination/Pagination';
import SectionHowItWork from '@/components/SectionHowItWork/SectionHowItWork';

export default function CollectionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category as string;
  const subcategory = searchParams.subcategory as string;
  const [totalPages, setTotalPages] = useState(1);

  const handleTotalPagesChange = useCallback((newTotalPages: number) => {
    setTotalPages(newTotalPages);
  }, []);

  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-md">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Koleksi Produk Magnet
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Koleksi produk magnet yang sudah dipastikan kualitasnya dan harga yang terbaik.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          
          <main>
            <TabFilters />
              <ProductList 
                page={page} 
                category={category} 
                subcategory={subcategory} 
                onTotalPagesChange={handleTotalPagesChange}
              />
            <Pagination totalPages={totalPages} />
          </main>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />
        <SectionHowItWork />
      </div>
    </div>
  );
}