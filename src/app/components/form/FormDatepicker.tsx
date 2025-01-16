"use client";

import { useState } from "react";

import Datepicker from "tailwind-datepicker-react"
import { FaAngleLeft, FaAngleRight, FaCalendarDays } from "react-icons/fa6";

import { cn, getDatepickerOptions } from "@/app/lib/utils";
import { useOutsideClick } from "@/app/lib/useOutsideClick";

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
    // () => ReactElement | JSX.Element
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
          {/* <div className="self-center">
            <FaCalendarDays className="text-base-gray-700" />
          </div> */}
          <input
            type="text"
            value={selectedDate.toLocaleDateString('pl')}
            onFocus={() => setShow(true)}
            readOnly
            className="w-full cursor-pointer rounded-full border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-base-green-500 sm:text-sm"
            />
        </div>
      </Datepicker>
    </div>
  )
};
