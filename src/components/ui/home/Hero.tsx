export default function Hero() {
  return (
    <div
      className="relative py-36"
      style={{
        background:
          "linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url('/banner-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto text-right text-white">
        <h1 className="mb-4 text-6xl font-medium capitalize">
          CV. Karya Cipta Magnet
        </h1>
        <p>
          CV. Karya Cipta Magnet (KCM) adalah Specialist Permanent Magnet Trap <br />
          yang berada di Kec Gunung sindur, Bogor, Jawa Barat. KCM adalah salah
          satu <br /> perusahaan yang bergerak dalam usaha rekayasa mekanik maupun supplier.
        </p>
        <div className="mt-12">
          <a
            href="#"
            className="rounded-md border border-primary bg-primary px-8 py-3 font-medium 
            text-white hover:bg-transparent hover:text-primary"
          >
            Lihat Produk
          </a>
        </div>
      </div>
    </div>
  );
}
