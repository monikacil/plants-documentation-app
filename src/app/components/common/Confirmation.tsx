"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  confirmClick: () => void;
};

export default function ConfirmationModal({ children, confirmClick }: Props) {
  const router = useRouter();

  async function handleConfirm() {
    confirmClick();
    router.back();
  }

  return (
    <>
      <p>Are you sure?</p>
      {children}
      <footer className="flex justify-end gap-2">
        <Button color="danger" onClick={handleConfirm}>
          Yes
        </Button>
        <Button color="primary" onClick={() => router.back()}>
          No
        </Button>
      </footer>
    </>
  );
}
