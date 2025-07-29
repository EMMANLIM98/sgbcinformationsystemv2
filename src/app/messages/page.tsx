import React from 'react'
import MessageSidebar from './MessageSidebar'
import { getMessagesByContainer } from '../actions/messageActions'

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ container: string }> }) {
  const {container} = await searchParams;
  const messages = await getMessagesByContainer(container);
  console.log(messages);

  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
      <div className='col-span-2'>
        <MessageSidebar />
      </div>
      <div className='col-span-10'>
        Message table here...
      </div>
    </div>
  )
}
