import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React, { FC } from "react";
import IconDiscount from "./IconDiscount";

interface Props {
  stock: number;
  className?: string;
}

const ProductStatus: FC<Props> = ({
  stock,
  className = "absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300",
}) => {
  const renderStatus = () => {
    if (!stock) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
    
    if (stock > 0) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">Stok Tersedia</span>
        </div>
      );
    }
    if (stock === 0) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ms-1 leading-none">Stok Habis</span>
        </div>
      );
    }
    return null;
  };

  return renderStatus();
};

export default ProductStatus;
