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

  return (
    <BasicModal title={ title }>
      <section>
        <p>Are you sure?</p>
        {children}
        <footer>
          <BasicButton onClick={onConfirmClick}>Yes</BasicButton>
          <BasicButton onClick={() => router.back()}>No</BasicButton>
        </footer>
      </section>
    </BasicModal>
  );
}
