'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export function ProductList({ 
  page, 
  category, 
  subcategory, 
  onTotalPagesChange 
}: { 
  page: number, 
  category?: string, 
  subcategory?: string,
  onTotalPagesChange: (totalPages: number) => void
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams({ page: page.toString() });
      if (category) params.append('category', category);
      if (subcategory) params.append('subcategory', subcategory);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      setProducts(data.products);
      onTotalPagesChange(data.totalPages);
      console.log('Fetched total pages:', data.totalPages); // Debug log
    };

    fetchProducts();
  }, [page, category, subcategory, onTotalPagesChange]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
      {products.map((item, index) => (
        <ProductCard data={item} key={index} />
      ))}
    </div>
  );
}