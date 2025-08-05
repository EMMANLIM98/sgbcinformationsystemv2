import { deleteMessage } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { Key } from "readline";
import useMessageStore from "./useMessageStore";
import { useShallow } from "zustand/shallow";

export const useMessages = (initialMessages: MessageDto[]) => {
    const { set, remove, messages } = useMessageStore(useShallow(state => ({
        set: state.set,
        remove: state.remove,
        messages: state.messages
    })));
    const searchParams = useSearchParams();
    const router = useRouter();
    const isOutbox = searchParams.get('container') === 'outbox';
    const [isDeleting, setIsDeleting] = useState({ id: '', loading: false });

    useEffect(() => {
        set(initialMessages);
        
        return () => {
            set([]);
        }
    }, [initialMessages, set]);

    const columns = [
        { key: isOutbox ? 'recipientFirstName' : 'senderFirstName', label: isOutbox ? 'Recipient' : 'Sender' },
        { key: 'text', label: 'Message' },
        { key: 'created', label: isOutbox ? 'Date Sent' : 'Date Received' },
        { key: 'actions', label: 'Actions' }
    ]

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setIsDeleting({ id: message.id, loading: true });
        await deleteMessage(message.id, isOutbox);
        router.refresh();
        setIsDeleting({ id: '', loading: false });
    }, [isOutbox, router]);

    const handleRowSelect = (key: Key) => {
        const message = messages.find((m: MessageDto) => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + '/chat')
    }

    return {
        isOutbox,
        columns,
        deleteMessage: handleDeleteMessage,
        selectRow: handleRowSelect,
        isDeleting,
        messages
    }
}