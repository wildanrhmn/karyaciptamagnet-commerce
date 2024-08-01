import React from "react";
import logoImg from "@/images/logo.png";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {img ? (
        <div className="flex items-center gap-2">        
          <Image
            className={`block h-8 sm:h-12 w-auto`}
            src={img}
            alt="Logo"
            sizes="230px"
            priority
          />
          <span className={`dark:text-[#F9FAFB] text-[#26303E] font-semibold text-md hidden sm:block`}>Karya Cipta Magnet</span>
        </div>
      ) : (
        "Logo Here"
      )}
    </Link>
  );
};

export default Logo;
