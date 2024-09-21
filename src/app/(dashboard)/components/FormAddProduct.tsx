"use client";

import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { createProductAndRedirect } from "@/app/(dashboard)/data/action";
import { useFormState } from "react-dom";
import {
  Package,
  FileText,
  Weight,
  DollarSign,
  FolderTree,
  Folder,
  BarChart3,
  Image as ImageIcon,
  X,
  Loader2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function FormAddProduct({
  productCategories,
  productSubCategories,
}: {
  productCategories: any[];
  productSubCategories: any[];
}) {
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(createProductAndRedirect, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && images.length < 3) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    dispatch(formData);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Product Name
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <input
              id="name"
              name="name"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter product name"
              aria-describedby="name-error"
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Images */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">
            Product Images (Max 3)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          {images.length < 3 && (
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              <input
                ref={fileInputRef}
                id="images"
                name="images"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="images-error"
              />
            </div>
          )}
          <div id="images-error" aria-live="polite" aria-atomic="true">
            {images.length >= 3 && (
              <p className="mt-2 text-sm text-yellow-500">
                Maximum number of images (3) reached.
              </p>
            )}
          </div>
        </div>

        {/* Product Weight */}
        <div className="mb-4">
          <label htmlFor="weight" className="mb-2 block text-sm font-medium">
            Weight (in grams)
          </label>
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <input
              id="weight"
              name="weight"
              type="number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter product weight"
              aria-describedby="weight-error"
            />
          </div>
          <div id="weight-error" aria-live="polite" aria-atomic="true">
            {state.errors?.weight &&
              state.errors.weight.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <label
            htmlFor="priceRange"
            className="mb-2 block text-sm font-medium"
          >
            Price Range
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <input
              id="priceRange"
              name="priceRange"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter price range"
              aria-describedby="priceRange-error"
            />
          </div>
          <div id="priceRange-error" aria-live="polite" aria-atomic="true">
            {state.errors?.priceRange &&
              state.errors.priceRange.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Category */}
        <div className="mb-4">
          <label
            htmlFor="productCategory"
            className="mb-2 block text-sm font-medium"
          >
            Product Category
          </label>
          <div className="relative">
            <FolderTree className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <select
              id="productCategory"
              name="productCategoryId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="productCategory-error"
            >
              <option value="" disabled>
                Select a category
              </option>
              {productCategories.map((category) => (
                <option
                  key={category.productCategoryId}
                  value={category.productCategoryId}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div id="productCategory-error" aria-live="polite" aria-atomic="true">
            {state.errors?.productCategoryId &&
              state.errors.productCategoryId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Sub-Category */}
        <div className="mb-4">
          <label
            htmlFor="productSubCategory"
            className="mb-2 block text-sm font-medium"
          >
            Product Sub-Category
          </label>
          <div className="relative">
            <Folder className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <select
              id="productSubCategory"
              name="productSubCategoryId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="productSubCategory-error"
            >
              <option value="" disabled>
                Select a sub-category
              </option>
              {productSubCategories.map((subCategory) => (
                <option
                  key={subCategory.productSubCategoryId}
                  value={subCategory.productSubCategoryId}
                >
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
          <div
            id="productSubCategory-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.productSubCategoryId &&
              state.errors.productSubCategoryId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Stock
          </label>
          <div className="relative">
            <BarChart3 className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <input
              id="stock"
              name="stock"
              type="number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter stock quantity"
              aria-describedby="stock-error"
            />
          </div>
          <div id="stock-error" aria-live="polite" aria-atomic="true">
            {state.errors?.stock &&
              state.errors.stock.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-[18px] w-[18px] text-gray-500" />
            <textarea
              id="description"
              name="description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter product description"
              aria-describedby="description-error"
              rows={4}
            ></textarea>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div
        className="mt-6"
        id="validation-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors && (
          <p className="mt-2 text-sm text-red-500">
            Missing Fields. Failed to Create Product
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={"/dashboard/inventory" as any}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <ButtonPrimary type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : "Create Product"}
        </ButtonPrimary>
      </div>
    </form>
  );
}
