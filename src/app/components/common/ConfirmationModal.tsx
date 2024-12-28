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
        <footer className="flex justify-end gap-2">
          <BasicButton color="failure" onClick={ onConfirmClick }>Yes</BasicButton>
          <BasicButton color="gray" onClick={() => router.back()}>No</BasicButton>
        </footer>
      </section>
    </BasicModal>
  );
}
