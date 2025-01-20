'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

import { IoClose } from "react-icons/io5";

type ModalButtonProps = {
  route?: string
}

export default function ModalButton({ route }: ModalButtonProps) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  if (route) {
      return <Link href={route} scroll={ false }><IoClose className="bg-base-gray-800 hover:bg-base-gray-900 text-white p-2 rounded-xl text-4xl cursor-pointer"/></Link>
  }

  return <IoClose className="bg-base-gray-800 hover:bg-base-gray-900 text-white p-2 rounded-xl text-4xl cursor-pointer" onClick={ handleClose }/>
}
