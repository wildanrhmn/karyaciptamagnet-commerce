import RegisterForm from "./RegisterForm";
import Image from "next/image";
import Link from "next/link";
export default function SignInPage() {
  return (
    <div className="text-[#333]">
      <div className="fle-col flex min-h-screen items-center justify-center px-2 sm:px-4 py-6">
        <div className="grid w-full max-w-7xl items-center gap-10 rounded-xl bg-white sm:p-24 py-11 px-5 shadow-md md:grid-cols-2">
          <div className="max-md:text-center hidden sm:block">
          <div className="flex items-center justify-center xl:justify-start mb-6">
              <Image src="/logo.png" alt="Karya Cipta Magnet Logo" width={100} height={100} />
            </div>
            <h2 className="text-4xl font-extrabold lg:text-5xl lg:leading-[55px]">
              Selamat Datang!
            </h2>
            <p className="mt-6 text-sm leading-6">
              E-Karya Cipta Magnet merupakan platform digital salah satu perusahaan yang bergerak dalam usaha
              rekayasa mekanik maupun supplier.
            </p>
            <p className="mt-10 text-sm">
              Sudah memiliki akun?
              <Link
                href="signin"
                className="ml-1 font-semibold text-blue-600 hover:underline"
              >
                Masuk sekarang!
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
