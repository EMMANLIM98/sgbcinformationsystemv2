import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import React, { ReactNode } from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
    header: string
    body: ReactNode
    footerButtons: ButtonProps[]
}

export default function AppModal({ isOpen, onClose, header, body, footerButtons }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement='top-center'
            motionProps={{ 
                variants: {
                    enter: {y: 0, opacity: 100, transition: { duration: 0.3 }},
                    exit: {y: 100, opacity: 0, transition: { duration: 0.3 }}
                }
            }}
        >
            <ModalContent>
                <ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    {footerButtons.map((props: ButtonProps, index) => (
                        <Button {...props} key={index}>
                            {props.children}
                        </Button>
                    ))}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
