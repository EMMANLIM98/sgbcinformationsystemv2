import { MessageWithSenderRecipient } from "@/types";
import { formatShortDateTime } from "./util";

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
  return {
    id: message.id,
    text: message.text,
    created: formatShortDateTime(message.created),
    dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
    senderId: message.sender?.userId,
    senderFirstName: message.sender?.firstName,
    senderLastName: message.sender?.lastName,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientFirstName: message.recipient?.firstName,
    recipientLastName: message.recipient?.lastName,
    recipientImage: message.recipient?.image,
  };
}
