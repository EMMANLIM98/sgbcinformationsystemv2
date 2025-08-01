'use client';
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { HeroUIProvider } from "@heroui/system";
import { ToastContainer } from "react-toastify";

export default function Providers({ children, userId }: { children: React.ReactNode, userId: string | null}) {
  usePresenceChannel();
  useNotificationChannel(userId);
  return (
    <HeroUIProvider>
      <ToastContainer position="bottom-right" className="z-50" />
      {children}
    </HeroUIProvider>
  )
}
