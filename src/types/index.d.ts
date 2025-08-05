import { Prisma } from "@prisma/client";
import { ZodIssue } from "zod/v3";

type ActionResult<T> =
    { status: "success", data: T } | { status: "error", error: string | ZodIssue[] }

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
    select: {
        id: true
        text: true
        created: true
        dateRead: true
        sender: {
            select: {
                userId: true
                firstName: true
                lastName: true
                image: true | null
            }
        }
        recipient: {
            select: {
                userId: true
                firstName: true
                lastName: true
                image: true | null
            }
        }
    }
}>

type MessageDto = {
    id: string
    text: string
    created: string
    dateRead: string | null
    senderId?: string
    senderFirstName?: string
    senderLastName?: string
    senderImage?: string | null
    recipientId?: string
    recipientFirstName?: string
    recipientLastName?: string
    recipientImage?: string | null
}

type UserFilters = {
    ageRange: number[]
    orderBy: string
    gender: string[]
}