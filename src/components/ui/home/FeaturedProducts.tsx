import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <div className="container mx-auto py-16">
      <h2 className="mb-6 text-2xl font-bold uppercase text-gray-800">
        PRODUK UTAMA
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnets.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnet Neoudyium</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnet_separator.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnetic Separator</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnet_accessoris.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnetic Accessories</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnet_conveyor.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnetic Conveyor</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnets.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnet Neoudyium</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnet_separator.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnetic Separator</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnet_accessoris.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnetic Accessories</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white px-2 py-2 shadow rounded">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-1">
            <div className="relative w-full h-[200px]">
              <Image
                src="/category/magnet_conveyor.webp"
                fill
                alt="featured 1"
                className="object-cover"
              />
            </div>
            <span className="text-[15px] text-gray-800">Magnetic Conveyor</span>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 py-2 text-[14px] hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Detail Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
