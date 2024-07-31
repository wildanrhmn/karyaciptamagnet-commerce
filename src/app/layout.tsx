import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import AuthWrapper from "@/auth/auth-wrapper";
import CommonClient from "./CommonClient";

import { WishlistProvider } from "@/context/WishlistContext";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CV Karya Cipta Magnet - Specialist Permanent Magnet Trap",
    template: "%s | CV Karya Cipta Magnet",
  },
  description:
    "CV. Karya Cipta Magnet (KCM) adalah Specialist Permanent Magnet Trap yang berada di Kec Gunung sindur, Bogor, Jawa Barat. KCM adalah salah satu perusahaan yang bergerak dalam usaha rekayasa mekanik maupun supplier.",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://cvkaryaciptamagnet.com"),
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <AuthWrapper>
          <SiteHeader />
          <WishlistProvider>
            {children}
          </WishlistProvider>
          <CommonClient />
          <Footer />
        </AuthWrapper>
      </body>
    </html>
  );
}
