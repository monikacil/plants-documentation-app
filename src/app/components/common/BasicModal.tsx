'use client'
import { Modal } from "flowbite-react";
import { useRouter } from 'next/navigation'

interface ModalProps {
  children: React.ReactNode,
  title: string,
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
}

export default function BasicModal({ children, title, size="5xl" }: ModalProps) {
  const router = useRouter()

  return (
    <>
      <Modal size={ size } show={ true } position="center" onClose={ () => {
          router.back()
        }}>
        <Modal.Header>{ title }</Modal.Header>
        <Modal.Body>
          { children }
        </Modal.Body>
      </Modal>
    </>
  )
}
