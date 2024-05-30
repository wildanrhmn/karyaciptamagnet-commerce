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

  const [activeTabOffset, setActiveTabOffset] = useState(0);
  const [activeTabWidth, setActiveTabWidth] = useState(0);
  const descriptionTabRef = useRef(null);
  const informationTabRef = useRef(null);
  const activeTabRef = tab.descriptionActive ? descriptionTabRef : informationTabRef;

  useEffect(() => {
    if (activeTabRef.current) {
      const { offsetLeft, offsetWidth } = activeTabRef.current;
      setActiveTabOffset(offsetLeft);
      setActiveTabWidth(offsetWidth);
    }
  }, [tab, activeTabRef]);

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
            <div className="absolute right-0 top-10 z-10 flex flex-col items-center justify-center rounded-md bg-white pb-3 shadow-sm">
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

      <div>
        <div className="mb-4 border-y border-gray-200">
          <ul className="-mb-px flex flex-wrap">
            <li>
              <button
                className={`inline-block rounded-t-lg border-b-2
                px-4 py-3 text-center text-sm 
                ${
                  tab.descriptionActive
                    ? "border-primary font-bold text-primary"
                    : "border-transparent font-medium text-black opacity-50 transition-all duration-300"
                }
                `}
                type="button"
                onClick={() =>
                  setTab({
                    descriptionActive: true,
                    informationActive: false,
                  })
                }
              >
                Deskripsi
              </button>
            </li>
            <li>
              <button
                className={`inline-block rounded-t-lg border-b-2
                            px-4 py-3 text-center text-sm
                            ${
                              tab.informationActive
                                ? "border-primary font-bold text-primary"
                                : "border-transparent font-medium text-black opacity-50 transition-all duration-300"
                            }
                          `}
                type="button"
                onClick={() =>
                  setTab({
                    descriptionActive: false,
                    informationActive: true,
                  })
                }
              >
                Informasi Toko
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
