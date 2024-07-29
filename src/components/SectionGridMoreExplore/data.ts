import { StaticImageData } from "next/image";
import explore1Svg from "@/images/collections/explore1.svg";
import explore2Svg from "@/images/collections/explore2.svg";
import explore3Svg from "@/images/collections/explore3.svg";
import explore4Svg from "@/images/collections/explore4.svg";
import explore5Svg from "@/images/collections/explore5.svg";
import explore6Svg from "@/images/collections/explore6.svg";
import explore7Svg from "@/images/collections/explore7.svg";
import explore8Svg from "@/images/collections/explore8.svg";
import explore9Svg from "@/images/collections/explore9.svg";
//
import explore1Png from "@/images/collections/explore1.png";
import explore2Png from "@/images/collections/explore2.png";
import explore3Png from "@/images/collections/explore3.png";
import explore4Png from "@/images/collections/explore4.png";
import explore5Png from "@/images/collections/explore5.png";
import explore6Png from "@/images/collections/explore6.png";
import explore7Png from "@/images/collections/explore7.png";
import explore8Png from "@/images/collections/explore8.png";
import explore9Png from "@/images/collections/explore9.png";
import explore10Png from "@/images/collections/explore10.png";
import explore11Png from "@/images/collections/explore11.png";
import explore12Png from "@/images/collections/explore12.png";
import explore13Png from "@/images/collections/explore13.png";
import explore14Png from "@/images/collections/explore14.png";
import explore15Png from "@/images/collections/explore15.png";
import explore16Png from "@/images/collections/explore16.png";
import explore17Png from "@/images/collections/explore17.png";
import explore18Png from "@/images/collections/explore18.png";
import explore19Png from "@/images/collections/explore19.png";
import explore20Png from "@/images/collections/explore20.png";
import explore21Png from "@/images/collections/explore21.png";
import explore22Png from "@/images/collections/explore22.png";


export interface ExploreType {
  id: number;
  name: string;
  desc: string;
  image: string | StaticImageData;
  svgBg: string;
  color?: string;
  count?: number;
}

export const DEMO_MORE_EXPLORE_DATA_2: ExploreType[] = [
  {
    id: 4,
    name: "Cycling Shorts",
    desc: "Manufacturar",
    image: explore9Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
  },
  {
    id: 5,
    name: "Cycling Jersey",
    desc: "Manufacturar",
    image: explore5Png,
    svgBg: explore5Svg,
    color: "bg-blue-50",
    count: 222,
  },
  {
    id: 6,
    name: "Car Coat",
    desc: "Manufacturar",
    image: explore6Png,
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 7,
    name: "Sunglasses",
    desc: "Manufacturar",
    image: explore7Png,
    svgBg: explore7Svg,
    color: "bg-stone-100",
    count: 98,
  },
  {
    id: 8,
    name: "kid hats",
    desc: "Manufacturar",
    image: explore8Png,
    svgBg: explore8Svg,
    color: "bg-blue-50",
    count: 33,
  },
  {
    id: 9,
    name: "Wool Jacket",
    desc: "Manufacturar",
    image: explore4Png,
    svgBg: explore4Svg,
    color: "bg-slate-100/80",
    count: 122,
  },
];
export const DEMO_MORE_EXPLORE_DATA: ExploreType[] = [
  {
    id: 1,
    name: "Neodymium Magnets",
    desc: "Rare Earth Magnets",
    image: explore1Png,
    svgBg: explore3Svg,
    color: "bg-indigo-50",
    count: 155,
  },
  {
    id: 2,
    name: "Samarium Cobalts Magnet",
    desc: "Rare Earth Magnets",
    image: explore2Png,
    svgBg: explore1Svg,
    color: "bg-slate-100/80",
    count: 22,
  },
  {
    id: 3,
    name: "Wind Turbine Magnets",
    desc: "Rare Earth Magnets",
    image: explore3Png,
    svgBg: explore2Svg,
    color: "bg-violet-50",
    count: 144,
  },
  {
    id: 4,
    name: "PM Motor Magnets",
    desc: "Rare Earth Magnets",
    image: explore4Png,
    svgBg: explore5Svg,
    color: "bg-orange-50",
    count: 343,
  },
  {
    id: 5,
    name: "Magnetic Sheets",
    desc: "Flexible Magnets",
    image: explore5Png,
    svgBg: explore9Svg,
    color: "bg-blue-50",
    count: 222,
  },
  {
    id: 6,
    name: "Magnetic Strips",
    desc: "Flexible Magnets",
    image: explore6Png,
    svgBg: explore4Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 7,
    name: "Fridge Magnets",
    desc: "Flexible Magnets",
    image: explore7Png,
    svgBg: explore7Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 8,
    name: "Magnetic Bracelet",
    desc: "Flexible Magnets",
    image: explore8Png,
    svgBg: explore8Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 9, // Fixed numbering
    name: "Magnetic Educational Toys",
    desc: "Flexible Magnets",
    image: explore9Png,
    svgBg: explore2Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 10, // Fixed numbering
    name: "Magnetic White Board",
    desc: "Flexible Magnets",
    image: explore10Png,
    svgBg: explore3Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 11, // Fixed numbering
    name: "Magnetic Hooks",
    desc: "Magnetic Assembly",
    image: explore11Png,
    svgBg: explore1Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 12, // Fixed numbering
    name: "Pot Magnet",
    desc: "Magnetic Assembly",
    image: explore12Png,
    svgBg: explore5Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 13, // Fixed numbering
    name: "Rubber Coated Magnet",
    desc: "Magnetic Assembly",
    image: explore13Png,
    svgBg: explore7Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 14, // Fixed numbering
    name: "Magnetic Component",
    desc: "Magnetic Assembly",
    image: explore14Png,
    svgBg: explore8Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 15, // Fixed numbering
    name: "Magswitch",
    desc: "Magnetic Assembly",
    image: explore15Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 16, // Fixed numbering
    name: "Magnetic Bar",
    desc: "Magnetic Separator",
    image: explore16Png,
    svgBg: explore4Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 17, // Fixed numbering
    name: "Magnetic Grill",
    desc: "Magnetic Separator",
    image: explore17Png,
    svgBg: explore2Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 18, // Fixed numbering
    name: "Magnetic Liquid Trap",
    desc: "Magnetic Separator",
    image: explore18Png,
    svgBg: explore3Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 19, // Fixed numbering
    name: "Drawer Magnet",
    desc: "Magnetic Separator",
    image: explore19Png,
    svgBg: explore1Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 20, // Fixed numbering
    name: "Magnetic Roll Separator",
    desc: "Magnetic Separator",
    image: explore20Png,
    svgBg: explore5Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 21, // Fixed numbering
    name: "Magnetic Plate",
    desc: "Magnetic Separator",
    image: explore21Png,
    svgBg: explore7Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 22, // Fixed numbering
    name: "Magnetic Sheet Separator",
    desc: "Magnetic Separator",
    image: explore22Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 155,
  },
];
