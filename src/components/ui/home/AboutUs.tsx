import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="relative my-11 before:absolute before:inset-0 before:z-10 before:h-full before:w-full before:bg-black before:opacity-70">
      <Image
        src="/workshop.jpg"
        alt="Banner Image"
        fill
        className="inset-0 object-cover"
      />
      <div className="relative z-50 mx-auto grid h-full min-h-[300px] max-w-7xl grid-cols-2 items-center py-36 text-white">
        <div className="flex flex-col">
          <div className="mb-8 flex flex-col gap-2">
            <span className="text-[16px] font-semibold tracking-widest text-primary">
              TENTANG KAMI
            </span>
            <h2 className="text-4xl font-bold">CV KARYA CIPTA MAGNET</h2>
          </div>
          <p className="mb-5 text-[15px] leading-6">
            Dengan pengalaman lebih dari 10 tahun dalam desain dan pembuatan
            sistem magnetik berkinerja tinggi, kami memasok peralatan magnetik
            penting ke beberapa nama terkemuka di industri yang paling menuntut.
          </p>
          <p className="text-[15px] leading-6">
            CV. Karya Cipta Magnet (KCM) adalah Specialist Permanent Magnet Trap
            yang berada di Kec Gunung sindur, Bogor, Jawa Barat. KCM adalah
            salah satu perusahaan yang bergerak dalam usaha rekayasa mekanik
            maupun supplier. KCM didirikan dengan Akta Notaris HUTRIZAL, Sarjana
            Hukum, Magister Kenotariatan, No. 4 tanggal 8 maret 2018 dan telah
            mendapat pengesahan dari Menteri Hukum dan Hak Asasi Manusia melalui
            SK NO. AHU.02.AH.02.01. TAHUN 2010 pada tanggal 13 Januari 2010.
          </p>
          <Link
            href="#"
            className="text-md mt-10 flex w-fit items-center gap-1 rounded-md bg-blue-500 px-5 py-2 hover:bg-blue-600"
          >
            Lebih Lanjut
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
