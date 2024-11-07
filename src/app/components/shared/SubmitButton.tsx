"use client";

type SubmitButtonType = {
  text: string,
  disabled?: boolean
}

export default function SubmitButton({text, disabled= false}: SubmitButtonType ) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {text}
    </button>
  )
}