"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { FaX } from "react-icons/fa6";

type Props = {
  open: boolean,
  title?: string,
  description?: string,
  children: React.ReactNode,
  onOpenChangeAction: (v: boolean) => void,
}

export function Modal({ open, title, description, children, onOpenChangeAction }: Props) {

  return (
    <Dialog.Root open={ open } onOpenChange={ onOpenChangeAction }>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 max-w-md w-full -translate-x-1/2 -translate-y-1/2 bg-background-light p-6 rounded-xl shadow-xl"
        >
          { title && (
            <Dialog.Title className="text-xl font-semibold mb-2 text-text-light ">
              { title }
            </Dialog.Title>
          ) }
          { description && (
            <Dialog.Description className="mb-4 text-muted-light">
              { description }
            </Dialog.Description>
          ) }
          { children }
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-2 text-xl p-3 text-muted-light hover:text-text-light transition-colors"
              aria-label="Close"
            >
              <FaX />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
