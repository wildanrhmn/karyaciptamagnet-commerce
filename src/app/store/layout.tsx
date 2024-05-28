import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import MobileSidebar from "./Navbar/MobileSidebar";
import { HeaderProvider } from "@/context/NavbarContext";

export const metadata = {
  title: "CV Karya Cipta Magnet Online Store",
  description:
    "CV. Karya Cipta Magnet (KCM) adalah Specialist Permanent Magnet Trap yang berada di Kec Gunung sindur, Bogor, Jawa Barat. KCM adalah salah satu perusahaan yang bergerak dalam usaha rekayasa mekanik maupun supplier.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderProvider>
        <Navbar />
        <MobileSidebar />
      </HeaderProvider>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
