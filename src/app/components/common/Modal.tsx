'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import Button from './Button';

interface ModalProps {
  children: React.ReactNode,
  title: string,
  color: string
}

export default function Modal({ children, title, color }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button text={ title } color={ color } onClick={() => setIsModalOpen(true)} />
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