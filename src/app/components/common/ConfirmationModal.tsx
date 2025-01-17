"use client"

import { useRouter } from "next/navigation";
import BasicButton from "./BasicButton";
import BasicModal from "./BasicModal";

type Props = {
  title: string,
  children: React.ReactNode,
  onConfirmClick: () => void
}

export default function ConfirmationModal({ title, children, onConfirmClick }: Props) {
  const router = useRouter()

  const handleConfirmClick = () => {
    onConfirmClick()
    router.back()
  }

  return (
    <BasicModal title={ title }>
      <section>
        <p>Are you sure?</p>
        { children }
        <footer className="flex justify-end gap-2">
          <BasicButton color="danger" onClick={ handleConfirmClick }>Yes</BasicButton>
          <BasicButton color="primary" onClick={ () => router.back() }>No</BasicButton>
        </footer>
      </section>
    </BasicModal>
  );
}
