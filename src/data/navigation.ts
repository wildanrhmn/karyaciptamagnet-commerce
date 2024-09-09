import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: ncNanoId(), href: "/", name: "Home  1" },
      { id: ncNanoId(), href: "/", name: "Header  1" },
      { id: ncNanoId(), href: "/", name: "Coming Soon" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/collection", name: "Category Page 1" },
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/account", name: "Accout Page" },
      { id: ncNanoId(), href: "/account-order", name: "Order Page" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home Demo 1",
  },
  {
    id: ncNanoId(),
    href: "/collection",
    name: "Category Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/collection",
        name: "Category page 1",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/cart",
    name: "Cart Page",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "Account Page",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/about",
        name: "About",
      },
      {
        id: ncNanoId(),
        href: "/login",
        name: "Login",
      },
      {
        id: ncNanoId(),
        href: "/signup",
        name: "Signup",
      },
      { id: ncNanoId(), href: "/forgot-pass", name: "Forgot Password" },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
  },
  {
    id: ncNanoId(),
    href: "/collection",
    name: "Produk",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "Tentang Kami",
  },
];
