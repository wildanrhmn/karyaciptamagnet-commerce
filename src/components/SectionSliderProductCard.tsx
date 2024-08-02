"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import axios from "axios";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "",
}) => {
  const [topSaleProducts, setTopSaleProducts] = useState([]);
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/topsale');
        setTopSaleProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };
    if (!sliderRef.current) return;

    if (topSaleProducts.length > 0 && sliderRef.current) {
      const slider = new Glide(sliderRef.current, OPTIONS);
      slider.mount();
      setIsShow(true);
      return () => {
        slider.destroy();
      };
    }
  }, [sliderRef, topSaleProducts]);
  

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {topSaleProducts.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
