"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { MessageDto } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/util";
import { Channel } from "pusher-js";
import useMessageStore from "@/hooks/useMessageStore";

type Props = {
  initialMessages: { messages: MessageDto[]; readCount: number };
  currentUserId: string;
  chatId: string;
};

export default function MessageList({
  initialMessages,
  currentUserId,
  chatId,
}: Props) {
  const channelRef = useRef<Channel | null>(null);
  const [messages, setMessages] = useState(initialMessages.messages);
  const updatedReadCount = useMessageStore((state) => state.updateUnreadCount);
  const setReadCount = useRef(false);

  useEffect(() => {
    if (!setReadCount.current) {
      updatedReadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages.readCount, updatedReadCount]);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message
      )
    );
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);

      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("messages:read", handleReadMessages);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current.unbind("messages:read", handleReadMessages);
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages yet"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
