import { CardBody, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import React from 'react'

export default function ChatPage() {
  return (
    <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Chat
            </CardHeader>
            <Divider />
            <CardBody>
                Chat
            </CardBody>
        </>
  )
}
