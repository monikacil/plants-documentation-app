"use client";

import { useState } from "react";

import Datepicker from "tailwind-datepicker-react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { cn } from "@/app/lib/utils/others";
import getDatepickerOptions from "@/app/lib/utils/getDatePickerOption"
import { useOutsideClick } from "@/app/lib/hooks/useOutsideClick";

type Props = {
  name: string,
  value?: string | undefined,
  maxDate?: Date | undefined,
  minDate?: Date | undefined,
  className?: string | undefined,
  onChange: (e: Date) => void | undefined,
}

export default function FormDatepicker({ name, value, maxDate, minDate, className, onChange }: Props) {
  const options = getDatepickerOptions(maxDate, minDate, name, {
    prev: () => <FaAngleLeft />,
    next: () => <FaAngleRight />,
  } )

  const [show, setShow] = useState(false)
	const [selectedDate, setSelectedDate] = useState(new Date || Date.parse(value || ""))
	const handleChange = (selectedDate: Date) => {
		setSelectedDate(selectedDate)
    if(selectedDate) {
      onChange(selectedDate)
    }
	}

  const ref = useOutsideClick(() => {
    setShow(false)
  });

  return (
    <div ref={ ref }>
      <Datepicker options={ options } onChange={ handleChange } show={show} setShow={ (state) => setShow(state) }>
        <div className={ cn("flex w-full rounded-full bg-white", className) } >
          <input
            type="text"
            name={ name }
            value={selectedDate.toDateString()}
            onFocus={() => setShow(true)}
            readOnly
            className={cn("w-full rounded-full border-0 py-1.5 px-2  placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-inset focus-visible:outline-base-green-500 focus:ring-2 focus:ring-inset focus:ring-base-green-500 sm:text-sm", className) }
            />
        </div>
      </Datepicker>
    </div>
  )
};
