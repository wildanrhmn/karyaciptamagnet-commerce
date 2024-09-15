
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
      <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <SiteHeader />
            {children}
          <Footer />

      </div>
  );
}
