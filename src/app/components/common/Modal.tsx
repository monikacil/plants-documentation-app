'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react';

interface ModalProps {
  children: React.ReactNode,
  isOpen: boolean,
  title: string,
  onClose: () => void
}

export default function Modal({ children, isOpen, title, onClose }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isModalOpen, isOpen])

  function handleCloseModal() {
    setIsModalOpen(false)
    onClose()
  }

  return (
    <>
      <Dialog open={isModalOpen} onClose={handleCloseModal} transition className="relative z-50 m-auto transition ease-out duration-300 data-[closed]:opacity-0">
        <div className="fixed justify-items-center content-center	 inset-0 w-full bg-black/30">
          <DialogPanel className="max-w-full w-[95%] md:max-w-[90%] md:w-[80%] lg:max-w-[75%] lg:w-[60%] border bg-white p-12">
            <DialogTitle className="font-bold text-lg pb-4">{ title }</DialogTitle>
            { children }
            <div className="flex gap-4">
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}