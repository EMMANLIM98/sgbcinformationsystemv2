import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'
import ChatForm from './ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'

export default async function ChatPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const messages = await getMessageThread(userId);

  console.log(messages);

  return (
    <CardInnerWrapper
      header='Chat'
      body={<div>Chat messages will appear here</div>}
      footer={<ChatForm />}
    />
  )
}
