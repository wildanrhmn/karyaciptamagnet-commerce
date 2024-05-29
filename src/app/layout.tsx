import "./globals.css";
import { Inter } from "next/font/google";
import AuthWrapper from "@/auth-wrapper";
import Providers from "@/components/ProgressBar";

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CV Karya Cipta Magnet Online Store",
  description:
    "CV. Karya Cipta Magnet (KCM) adalah Specialist Permanent Magnet Trap yang berada di Kec Gunung sindur, Bogor, Jawa Barat. KCM adalah salah satu perusahaan yang bergerak dalam usaha rekayasa mekanik maupun supplier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <Providers>
            <main className="bg-[#F8F8F8]">{children}</main>
            <Toaster position="bottom-center" />
          </Providers>
        </AuthWrapper>
      </body>
    </html>
  );
}
