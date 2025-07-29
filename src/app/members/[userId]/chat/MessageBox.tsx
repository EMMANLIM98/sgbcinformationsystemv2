'use client';
import { MessageDto } from '@/types'
import React from 'react'
import clsx from 'clsx'
import { Avatar } from '@heroui/react'
import { transformImageUrl } from '@/lib/util'

type Props = {
    message: MessageDto
    currentUserId: string
}

export default function MessageBox({ message, currentUserId }: Props) {
    const isCurrentUserSender = message.senderId === currentUserId;
    const renderAvatar = () => (
        <Avatar 
            name={message.senderName}
            className='self-end'
            src={transformImageUrl(message.senderImage) || '/images/user.png'}
        />
    )
  return (
    <div className='grid grid-rows-1'>
        <div className={clsx('flex gap-2 mb-3', {
            'justify-end text-right': isCurrentUserSender,
            'justify-start': !isCurrentUserSender 
        })}>
            {!isCurrentUserSender && renderAvatar()}
            <div>{message.text}</div>
            {isCurrentUserSender && renderAvatar()}
        </div>
    </div>
  )
}
