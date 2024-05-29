"use client";

import { useState } from "react";
import { ProductCategories } from "@/lib/placeholder-data";
import Link from "next/link";

const CategorySidebar = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleOpenCategory = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div className="join-vertical join w-full">
      <div className="rounded-none">
        <div className="collapse-title bg-primary text-lg font-bold text-white">
          Product Category
        </div>
      </div>
      {ProductCategories.map((category, index) => (
        <div
          key={index}
          className={`${
            category.hasProduct ? "collapse-arrow" : ""
          } join-item collapse border border-base-300`}
        >
          <input
            type="radio"
            name="my-accordion-4"
            checked={index === openIndex}
            onClick={() => handleOpenCategory(index)}
            readOnly
          />
          <div
            className={`collapse-title text-[15px] ${
              index === openIndex ? "border-b border-gray-300" : ""
            }`}
          >
            {category.categoryName}
          </div>
          {category.hasProduct && (
            <div className="collapse-content ml-2">
              {category.products.map((product, index) => (
                <div
                  key={index}
                  className="my-3 flex cursor-pointer items-center gap-3 opacity-80"
                >
                  <div className="h-1 w-1 rounded-full bg-black" />
                  <Link
                    href="#"
                    className="line-clamp-1 text-[14px] hover:text-primary hover:underline"
                  >
                    {product.productName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;
