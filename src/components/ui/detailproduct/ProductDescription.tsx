"use client";

import { useQRCode } from "next-qrcode";
import { IProduct } from "../../../../@types/definition";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";

const ProductDescription = ({ product }: { product: IProduct }) => {
  const { Canvas } = useQRCode();
  const [showQrCode, setShowQrCode] = useState(false);
  const [tab, setTab] = useState({
    descriptionActive: true,
    informationActive: false,
  });
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        qrCodeRef.current &&
        !qrCodeRef.current.contains(event.target as Node)
      ) {
        setShowQrCode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTab = (tabName: string) => {
    setTab({
      descriptionActive: tabName === "description",
      informationActive: tabName === "information",
    });
  };

  const tabButtonClass = (isActive: boolean) =>
    `inline-block rounded-t-lg border-b-2 px-4 py-3 text-center text-sm ${
      isActive
        ? "border-primary font-bold text-primary"
        : "border-transparent font-medium text-black opacity-50 transition-all duration-300"
    }`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start">
        <div className="relative flex items-center gap-4">
          <h5 className="text-2xl font-bold">{product?.name}</h5>
          <Icon
            icon="ic:baseline-qrcode"
            className="h-7 w-7 cursor-pointer text-black"
            onClick={() => setShowQrCode(!showQrCode)}
          />
          {showQrCode && (
            <div
              ref={qrCodeRef}
              className="absolute right-0 top-10 z-10 flex flex-col items-center justify-center rounded-md bg-white pb-3 shadow-sm"
            >
              <Canvas
                text={`https://karyaciptamagnet.com/products/${product?.id}`}
              />
              <span className="text-sm font-semibold italic">
                Scan the QR code
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="">
        <div className="mb-4 border-y border-gray-200">
          <ul className="-mb-px flex flex-wrap">
            <li>
              <button
                className={tabButtonClass(tab.descriptionActive)}
                type="button"
                onClick={() => toggleTab("description")}
              >
                Deskripsi
              </button>
            </li>
            <li>
              <button
                className={tabButtonClass(tab.informationActive)}
                type="button"
                onClick={() => toggleTab("information")}
              >
                Informasi Toko
              </button>
            </li>
          </ul>
        </div>

        {tab.descriptionActive && (
          <div>
            <h2 className="mb-3 text-lg font-bold">
              Detail Magnet Trap Separator 9.000
            </h2>
            <div className="desbox p-b-4 h-min max-h-[300px] overflow-hidden">
              <div className="text-justify">
                CV. Gauss Magnet Indonesia jual Magnet Trap Separator 9.000
                terbaik dan Profesional. Cek disini untuk informasi lebih
                lengkapnya! Sesuai dengan namanya, magnet trap ini berfungsi
                sebagai penangkap kontaminan metal (serbuk metal, metal piece,
                dan lain sebagainya) baik berupa bubuk, granule, maupun
                biji-bijian, yang ada pada produk pangan seperti kopi, teh,
                cabai, tepung, dan industri limbah.
              </div>
              <div className="mt-5">
                <strong>Spesifikasi Magnet Trap Separator:</strong>
              </div>
              <ul className="list-disc pl-5">
                <li>
                  <span>P: 495mm, L: 205mm</span>
                </li>
                <li>
                  <span>9 Batang Magnet Bar Silinder</span>
                </li>
                <li>
                  <span>Magnet Intensity 9.000 Gauss</span>
                </li>
                <li>
                  <span>Max Temperature: 80 C</span>
                </li>
                <li>
                  <span>Material: SUS 316, SUS 304</span>
                </li>
              </ul>
            </div>

            <div className="mt-11  flex items-start gap-5">
              <button className="flex items-center justify-center gap-2 bg-primary px-4 py-3 text-base font-semibold text-white">
                Pesan Sekarang
                <Icon icon="icon-park-outline:buy" className="h-5 w-5" />
              </button>

              <button className="flex items-center justify-center gap-2 bg-[#1E293B] px-4 py-3 text-base font-semibold text-white">
                Tambahkan ke Keranjang
                <Icon icon="bi:cart" className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
