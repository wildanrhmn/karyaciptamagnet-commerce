import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative my-11 before:absolute before:inset-0 before:z-10 before:h-full before:w-full before:bg-black before:opacity-50">
      <Image
        src="/workshop.jpg"
        alt="Banner Image"
        fill
        className="inset-0 object-cover"
      />
      <div className="relative z-50 mx-auto flex h-full min-h-[300px] max-w-6xl flex-col items-center justify-center p-6 text-center text-white">
        <h2 className="mb-6 text-2xl font-bold sm:text-4xl">
          Nyatakan Penawaran Anda
        </h2>
        <p className="text-center text-lg text-gray-200">
          Kontak kami untuk mendapatkan harga khusus dengan Magnet Trap kualitas
          terbaik!
        </p>
        <Link
          href="#"
          className="mt-8 rounded border-2 border-white bg-transparent px-6 py-2.5 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Hubungi Sekarang
        </Link>
      </div>
    </div>
  );
}
