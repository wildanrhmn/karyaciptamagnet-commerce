import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: imageRightPng2,
    heading: "Produsen Magnet Trap Terbaik",
    btnText: "Pesan Sekarang",
    btnLink: "/collection",
  },
  {
    image: imageRightPng3,
    heading: "Jaminan Kualitas Terbaik",
    btnText: "Pesan Sekarang",
    btnLink: "/collection",
  },
  {
    image: imageRightPng,
    heading: "Biaya Yang Terjangkau",
    btnText: "Pesan Sekarang",
    btnLink: "/collection",
  },
];
