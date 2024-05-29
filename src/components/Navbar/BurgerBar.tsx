'use client';

import { HeaderContext } from "@/context/NavbarContext";
import { useContext } from "react";

export default function BurgerBar() {
    const { isOpen, setIsOpen } = useContext(HeaderContext);
    return (
      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="h-7 w-7"
          fill="#333"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    );
  }