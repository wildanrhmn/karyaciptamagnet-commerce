"use client";
import React, { FC, useEffect, useState, useCallback } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import NcModal from "@/shared/NcModal/NcModal";
import { updateProduct } from "../data/action";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export interface ModalEditProps {
  show: boolean;
  onCloseModalEdit: () => void;
  product: any;
  productCategories: any[];
  productSubCategories: any[];
}

const ModalEdit: FC<ModalEditProps> = ({
  show,
  onCloseModalEdit,
  product,
  productCategories,
  productSubCategories,
}) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(
    updateProduct.bind(null, product.productId),
    initialState
  );
  const [images, setImages] = useState<string[]>(
    product.ProductImages.map((img: any) => img.imageUrl)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
        onCloseModalEdit();
      }
      setIsSubmitted(false);
    }
  }, [state, onCloseModalEdit, isSubmitted]);

  useEffect(() => {
    if (product && product.ProductImages) {
      setImages(product.ProductImages.map((img: any) => img.imageUrl));
    }
  }, [product]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    dispatch(formData);
    setIsSubmitted(true);
  }, [dispatch, images]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    return (
      <form
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Edit Product
        </h3>

        <div className="mt-8 space-y-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
          <Input
            id="name"
            name="name"
            defaultValue={product.name}
            placeholder="Product Name"
          />
          
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (g)</label>
          <Input
            id="weight"
            name="weight"
            type="number"
            defaultValue={product.weight}
            placeholder="Weight (g)"
          />
          
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
          <Input
            id="priceRange"
            name="priceRange"
            defaultValue={product.priceRange}
            placeholder="Price Range"
          />
          
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product.stock}
            placeholder="Stock"
          />

          <label htmlFor="productCategoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Category</label>
          <select
            id="productCategoryId"
            name="productCategoryId"
            defaultValue={product.productCategoryId}
            className="w-full rounded-lg border-neutral-200"
          >
            {productCategories.map((category) => (
              <option
                key={category.productCategoryId}
                value={category.productCategoryId}
              >
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="productSubCategoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Sub-Category</label>
          <select
            id="productSubCategoryId"
            name="productSubCategoryId"
            defaultValue={product.productSubCategoryId}
            className="w-full rounded-lg border-neutral-200"
          >
            {productSubCategories.map((subCategory) => (
              <option
                key={subCategory.productSubCategoryId}
                value={subCategory.productSubCategoryId}
              >
                {subCategory.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Images</label>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full max-h-44 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <label htmlFor={`file-upload-${index}`} className="cursor-pointer">
                    <span className="bg-white text-gray-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                      Change Image
                    </span>
                    <input
                      id={`file-upload-${index}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            placeholder="Description"
            className="w-full h-56 rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
          />
        </div>

        <div className="mt-4 space-x-3">
          <ButtonPrimary type="submit">Update Product</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalEdit}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEdit}
      renderContent={renderContent}
      modalTitle=""
    />
  );
};

export default ModalEdit;
