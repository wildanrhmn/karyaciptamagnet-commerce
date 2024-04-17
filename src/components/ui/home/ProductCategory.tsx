import Image from "next/image";
import Link from "next/link";

export default function ProductCategory() {
  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-bold uppercase text-gray-800">
        KATEGORI MAGNET
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="group relative w-full h-80 overflow-hidden rounded-sm">
          <Image
            src="/category/magnets.webp"
            alt="category 1"
            className="object-cover"
            fill
          />
          <Link
            href="#"
            className="font-roboto absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-xl font-medium text-white transition group-hover:bg-opacity-60"
          >
            Magnets
          </Link>
        </div>
        <div className="group relative w-full h-80 overflow-hidden rounded-sm">
          <Image
            src="/category/magnet_separator.webp"
            alt="category 2"
            className="object-cover"
            fill
          />
          <Link
            href="#"
            className="font-roboto absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-xl font-medium text-white transition group-hover:bg-opacity-60"
          >
            Magnet Separator
          </Link>
        </div>
        <div className="group relative w-full h-80 overflow-hidden rounded-sm">
          <Image
            src="/category/magnet_conveyor.webp"
            alt="category 3"
            className="object-cover"
            fill
          />
          <Link
            href="#"
            className="font-roboto absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-xl font-medium text-white transition group-hover:bg-opacity-60"
          >
            Magnetic Conveyor 
          </Link>
        </div>
        <div className="group relative w-full h-80 overflow-hidden rounded-sm">
          <Image
            src="/category/magnet_accessoris.webp"
            alt="category 4"
            className="object-cover"
            fill
          />
          <Link
            href="#"
            className="font-roboto absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-xl font-medium text-white transition group-hover:bg-opacity-60"
          >
            Magnetic Accessoris 
          </Link>
        </div>
      </div>
    </div>
  );
}
