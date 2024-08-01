'use client';

import React from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import twFocusClass from "@/utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ className = "", totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/collection?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${
            i === currentPage
              ? "bg-primary-6000 text-white"
              : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
          } ${twFocusClass()}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className={`nc-Pagination inline-flex space-x-1 mt-11 text-base font-medium ${className}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${
          currentPage <= 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
        } ${twFocusClass()}`}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${
          currentPage >= totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
        } ${twFocusClass()}`}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;