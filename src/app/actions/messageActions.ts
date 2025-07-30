'use server';

import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { ZodIssue } from "zod/v3";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";

export async function createMessage(recipientUserId: string, data: MessageSchema): Promise<ActionResult<Message>> {
    try {
        const userId = await getAuthUserId();
        const validated = messageSchema.safeParse(data);

        if (!validated.success) return { status: 'error', error: validated.error.issues as ZodIssue[] };

        const { text } = validated.data;
        const message = await prisma.message.create({
            data: {
                text,
                recipientId: recipientUserId,
                senderId: userId
            }
        });

        return { status: 'success', data: message }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'An unexpected error occurred while creating the message.' };
    }
}

export async function getMessageThread(recipientId: string) {
    try {
        const userId = await getAuthUserId();

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        recipientId,
                        senderDeleted: false
                    },
                    {
                        senderId: recipientId,
                        recipientId: userId,
                        recipientDeleted: false
                    }
                ]
            },
            orderBy: {
                created: 'asc'
            },
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        firstName: true,
                        lastName: true,
                        image: true
                    }

                }
            }
        });

        console.log(`Messages found: ${messages.length}`);

        if (messages.length > 0) {
            await prisma.message.updateMany({
                where: {
                    senderId: recipientId,
                    recipientId: userId,
                    dateRead: null
                },
                data: {
                    dateRead: new Date()
                }
            });
        }

        return messages.map(message => mapMessageToMessageDto(message));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMessagesByContainer(container: string) {
    try {
        const userId = await getAuthUserId();

        const conditions = {
            [container === 'outbox' ? 'senderId' : 'recipientId']: userId,
            ...(container === 'outbox' ? { senderDeleted: false } : { recipientDeleted: false })
        }

        const messages = await prisma.message.findMany({
            where: conditions,
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                }
            },
            orderBy: {
                created: 'desc'
            }
        });
        return messages.map(message => mapMessageToMessageDto(message));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
    const selector = isOutbox ? 'senderDeleted' : 'recipientDeleted';

    try {
        const userId = await getAuthUserId();

        await prisma.message.update({
            where: { id: messageId },
            data: {
                [selector]: true
            }
        });

        const messagesToDelete = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        senderDeleted: true,
                        recipientDeleted: true
                    },
                    {
                        recipientId: userId,
                        senderDeleted: true,
                        recipientDeleted: true
                    }
                ]
            }
        });

        if (messagesToDelete.length > 0) {
            await prisma.message.deleteMany({
                where: {
                    OR: messagesToDelete.map(m => ({ id: m.id }))
                }
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}