'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';

interface ModalProps {
  children: React.ReactNode,
  title: string,
}

export default function Modal({ children, title }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        {title}
      </button>
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