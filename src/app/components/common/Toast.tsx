import toast from "react-hot-toast";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";
import { ReactNode } from "react";

type ToastTheme = "success" | "error" | "info" | "warning"

const themeMap: Record<
  ToastTheme,
  {
    icon: ReactNode
    bg: string
    text: string
  }
> = {
  success: {
    icon: <HiCheckCircle className="text-2xl"/>,
    bg: "bg-green-500",
    text: "text-white",
  },
  error: {
    icon: <HiExclamationCircle className="text-2xl"/>,
    bg: "bg-red-500",
    text: "text-white",
  },
  info: {
    icon: <HiInformationCircle className="text-2xl"/>,
    bg: "bg-blue-500",
    text: "text-white",
  },
  warning: {
    icon: <HiExclamationTriangle className="text-2xl"/>,
    bg: "bg-yellow-400",
    text: "text-black",
  },
};

export function toastCustom(message: string, theme: ToastTheme = "info") {
  return toast.custom((t) => {
    const { icon, bg, text } = themeMap[ theme ];

    return (
      <div
        className={ `fixed left-1/2 top-[66vh] -translate-x-1/2 z-50 ${ bg } ${ text }
          px-6 py-4 rounded-xl shadow-lg flex items-center justify-between gap-4
          min-w-[320px] max-w-lg w-fit
          transition-all duration-300 ${
          t.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }` }
      >
        <span>{ icon }</span>
        <p className="text-base flex-1 text-left">{ message }</p>
        <button
          onClick={ () => toast.dismiss(t.id) }
          className="text-xl font-bold hover:opacity-80 transition"
        >
          <HiXMark/>
        </button>
      </div>
    );
  });
}