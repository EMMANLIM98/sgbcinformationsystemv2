'use client';
import { HeroUIProvider } from "@heroui/system";
import { ToastContainer } from "react-toastify";

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <HeroUIProvider>
      <ToastContainer position="bottom-right" className="z-50" />
        {children}
    </HeroUIProvider>
  )
}
