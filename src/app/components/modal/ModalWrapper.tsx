import type { ReactNode } from "react";
import ModalButton from "./ModalButton";

type ModalWindowProps = {
  children: ReactNode;
  title: string;
  route?: string;
};

export default function ModalWrapper({
  children,
  title,
  route,
}: ModalWindowProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mx-auto">
      <div className="fixed inset-0 bg-base-gray-900/60" />
      <div className="relative max-w-full min-w-[85%] lg:max-w-[70%] md:min-w-[50%] z-10 bg-base-gray-500 rounded-xl p-4 md:p-5 lg:p-7">
        <header className="flex items-center justify-between font-semibold text-xl md:text-2xl text-base-gray-800">
          <p>{title}</p>
          <ModalButton route={route} />
        </header>
        <main className="mt-5">{children}</main>
      </div>
    </div>
  );
}
