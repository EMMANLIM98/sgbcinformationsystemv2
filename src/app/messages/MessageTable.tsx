'use client';

import { MessageDto } from '@/types';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card } from '@heroui/react';
import React from 'react'
import MessageTableCell from './MessageTableCell';
import { useMessages } from '@/hooks/useMessages';

type Props = {
    messages: MessageDto[]
}

export default function MessageTable({ messages }: Props) {
    const {columns, isOutbox, isDeleting, deleteMessage, selectRow} = useMessages(messages);
    return (
        <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
            <Table
                aria-label="Message"
                selectionMode="single"
                onRowAction={(key) => selectRow(key)}
                shadow='none'
            >
                <TableHeader columns={columns}>
                    {(column) =>
                        <TableColumn key={column.key} width={column.key === 'text' ? '50%' : undefined}>
                            {column.label}
                        </TableColumn>}
                </TableHeader>
                <TableBody items={messages}>
                    {(item) => (
                        <TableRow key={item.id} className='cursor-pointer'>
                            {(columnKey) =>
                                <TableCell className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                    <MessageTableCell
                                        item={item}
                                        columnKey={columnKey as string}
                                        isOutbox={isOutbox}
                                        deleteMessage={deleteMessage}
                                        isDeleting={isDeleting.loading && isDeleting.id === item.id}
                                    />
                                </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}
