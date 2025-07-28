import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'
import ChatForm from './ChatForm'

export default function ChatPage() {
  return (
    <CardInnerWrapper
      header='Chat'
      body={<div>Chat messages will appear here</div>}
      footer={<ChatForm />}
    />
  )
}
