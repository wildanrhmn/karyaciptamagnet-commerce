"use client";

import { createContext, useState } from "react";

export const HeaderContext = createContext({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HeaderContext.Provider>
  );
};