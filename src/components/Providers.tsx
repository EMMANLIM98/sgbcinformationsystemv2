'use client';
import { getUnreadMessageCount } from "@/app/actions/messageActions";
import useMessageStore from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { HeroUIProvider } from "@heroui/system";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function Providers({ children, userId, profileComplete }: { children: React.ReactNode, userId: string | null, profileComplete: boolean }) {
  const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);

  const setUnreadCount = useCallback((amount: number) => {
    updateUnreadCount(amount);
  }, [updateUnreadCount]);

  useEffect(() => {
    if (userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);
  return (
    <HeroUIProvider>
      <ToastContainer position="bottom-right" className="z-50" />
      {children}
    </HeroUIProvider>
  )
}
