"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUrl } from "../../../../@types/definition";
const ProductThumbnail = ({ productImages }: { productImages: ImageUrl[] }) => {
  const [mainImage, setMainImage] = useState(productImages[0].url!);
  const [magnifyStyle, setMagnifyStyle] = useState({
    backgroundPosition: "0",
    backgroundSize: "cover",
  });
  const handleDynamicBgPosition = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const bgPosition = `-${x * 0.5}px -${y * 0.5}px`;
    setMagnifyStyle({
      backgroundPosition: bgPosition,
      backgroundSize: "200%",
    });
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div
        onMouseMove={handleDynamicBgPosition}
        onMouseLeave={() =>
          setMagnifyStyle({
            backgroundPosition: "0",
            backgroundSize: "cover",
          })
        }
        className="relative h-[380px] w-full overflow-hidden border border-[#D9D9D9] cursor-pointer"
      >
        <div
          className="absolute h-full w-full bg-no-repeat"
          style={{ backgroundImage: `url(${mainImage})`, ...magnifyStyle }}
        />
      </div>
      <div className="flex gap-2">
        {productImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[80px] w-[80px] border border-[#D9D9D9] hover:border-2 hover:border-primary"
            onMouseEnter={() => setMainImage(image.url)}
          >
            <Image
              src={image.url}
              alt="thumbnail_image"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductThumbnail;
