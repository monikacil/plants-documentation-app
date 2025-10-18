import toast from "react-hot-toast";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";
import { ReactNode } from "react";
import { cn } from "@/app/lib/utils/others";

type ToastTheme = "success" | "error" | "info" | "warning";

const icons: Record<ToastTheme, ReactNode> = {
  success: <HiCheckCircle className="text-2xl text-white" />,
  error: <HiExclamationCircle className="text-2xl text-white" />,
  info: <HiInformationCircle className="text-2xl text-white" />,
  warning: <HiExclamationTriangle className="text-2xl text-black" />,
};

export function toastCustom(message: string, theme: ToastTheme = "info") {
  return toast.custom((t) => (
    <div
      className={ cn(
        "fixed left-1/2 top-[85vh] -translate-x-1/2 z-50",
        "flex flex-col items-center justify-center",
        "transition-all duration-300 ease-out",
        t.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      ) }
    >
      <div className={ cn("toast-base", `toast-${ theme }`) }>
        <span className="flex items-center justify-center">{ icons[theme] }</span>
        <p className="flex-1 text-center leading-snug m-0">{ message }</p>
        <button
          onClick={ () => toast.dismiss(t.id) }
          className="flex items-center justify-center text-lg font-semibold hover:opacity-80 transition-opacity"
          aria-label="Close toast"
        >
          <HiXMark className="w-5 h-5" />
        </button>
      </div>
    </div>
  ));
}
