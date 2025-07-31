import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'
import ChatForm from './ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'
import MessageList from './MessageList';
import { createChatId } from '@/lib/util';
import { getAuthUserId } from '@/app/actions/authActions';

export default async function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const authUserId = await getAuthUserId();
  const messages = await getMessageThread(userId);
  const chatId = createChatId(authUserId, userId);

  return (
    <CardInnerWrapper
      header='Chat'
      body={
        <MessageList initialMessages={messages} currentUserId={userId} chatId={chatId} />
      }
      footer={<ChatForm />}
    />
  )
}
