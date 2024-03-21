import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

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
          <Navbar />
          <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
          <Footer />
      </div>
  );
}
