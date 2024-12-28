'use client'
import { Modal } from "flowbite-react";
import { useRouter } from 'next/navigation'

interface ModalProps {
  children: React.ReactNode,
  title: string,
}

export default function BasicModal({ children, title }: ModalProps) {
  const router = useRouter()

  return (
    <>
      <Modal show={ true } onClose={() => {
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
