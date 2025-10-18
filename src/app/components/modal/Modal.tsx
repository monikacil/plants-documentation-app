"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FaX } from "react-icons/fa6";
import { cn } from "@/app/lib/utils/others";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onOpenChangeAction: (v: boolean) => void;
};

export function Modal({
                        open,
                        title,
                        description,
                        children,
                        onOpenChangeAction,
                      }: Props) {
  return (
    <Dialog.Root open={ open } onOpenChange={ onOpenChangeAction }>
      <Dialog.Portal>
        {/* Overlay */ }
        <Dialog.Overlay
          className={ cn(
            "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
            "data-[state=open]:animate-fade-in"
          ) }
        />

        {/* Content */ }
        <Dialog.Content
          className={ cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "data-[state=open]:animate-pop-in"
          ) }
        >
          <div
            className={ cn(
              "relative w-full max-w-lg mx-auto",
              "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark",
              "border border-border-light dark:border-border-dark",
              "rounded-2xl p-6 shadow-2xl outline-none"
            ) }
          >
            {/* Header */ }
            { (title || description) && (
              <header className="mb-4 space-y-2 text-center">
                { title && (
                  <Dialog.Title
                    className="text-2xl font-semibold tracking-tight text-primary-light dark:text-primary-dark">
                    { title }
                  </Dialog.Title>
                ) }
                { description && (
                  <Dialog.Description className="text-muted-light dark:text-muted-dark text-sm">
                    { description }
                  </Dialog.Description>
                ) }
              </header>
            ) }

            {/* Main content */ }
            <div className="space-y-4">{ children }</div>

            {/* Close button */ }
            <Dialog.Close asChild>
              <button
                className={ cn(
                  "absolute top-4 right-4 rounded-full p-2 transition-colors",
                  "text-muted-light hover:text-text-light dark:hover:text-text-dark",
                  "hover:bg-border-light/60 dark:hover:bg-border-dark/50"
                ) }
                aria-label="Close"
              >
                <FaX className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
