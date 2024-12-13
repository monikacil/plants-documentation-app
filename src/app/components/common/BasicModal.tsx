'use client'
import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import BasicButton from './BasicButton';

interface ModalProps {
  children: React.ReactNode,
  title: string,
  btnText?: string,
  color?: string,
}

export default function BasicModal({ children, title, btnText, color }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <BasicButton color={ color } onClick={() => setIsModalOpen(true)}>{ btnText ? btnText : title }</BasicButton>
      <Dialog open={isModalOpen} onClose={handleCloseModal} transition className="relative z-50 m-auto transition ease-out duration-300 data-[closed]:opacity-0">
        <div className="fixed justify-items-center content-center	 inset-0 w-full bg-black/30">
          <DialogPanel className="max-w-full w-[95%] md:max-w-[90%] md:w-[80%] lg:max-w-[75%] lg:w-[60%] border bg-white p-12">
            <div className="flex justify-between items-center">
              <DialogTitle className="font-bold text-xl">{ title }</DialogTitle>
              <BasicButton size="sm" color="grey" onClick={handleCloseModal}>X</BasicButton>
            </div>
            { children }
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
