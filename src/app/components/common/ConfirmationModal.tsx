"use client"

import { useRouter } from "next/navigation";
import BasicButton from "./BasicButton";

type Props = {
  children: React.ReactNode,
  title: string,
  confirmClick: () => void
}

export default function ConfirmationModal({ children, confirmClick }: Props) {
  const router = useRouter()

  async function handleConfirm() {
    confirmClick()
    router.back()
  }

  return (
    <>
      <p>Are you sure?</p>
      { children }
      <footer className="flex justify-end gap-2">
        <BasicButton color="danger" onClick={ handleConfirm }>Yes</BasicButton>
        <BasicButton color="primary" onClick={ () => router.back() }>No</BasicButton>
      </footer>
    </>
  );
}
