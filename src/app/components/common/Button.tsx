"use client";

interface Props {
  text: string,
  color?:string,
  disabled?: boolean,
  onClick: () => void
}

export default function Button({text, disabled= false, color="blue", onClick}: Props ) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`text-white bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 shadow-lg shadow-${color}-500/50 dark:shadow-lg dark:shadow-${color}-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
    >
      {text}
    </button>
  )
}