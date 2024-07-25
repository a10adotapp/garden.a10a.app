"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type ScreenSize = {
  width: number;
  height: number;
};

export const ScreenSizeContext = createContext<ScreenSize | undefined>(undefined);

export function useScreenSize(): (ScreenSize | undefined) {
  return useContext(ScreenSizeContext);
}

export function ScreenSizeContextProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [screenSize, setScreenSize] = useState<ScreenSize>();

  useEffect(() => {
    const onResize = (() => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  )
}
