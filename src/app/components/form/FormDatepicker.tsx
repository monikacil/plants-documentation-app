"use client";

import { useState } from "react";

import Datepicker from "tailwind-datepicker-react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { cn } from "@/lib/utils/others";
import getDatepickerOptions from "@/lib/utils/getDatePickerOption";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

type Props = {
  name: string;
  value?: Date;
  maxDate?: Date;
  minDate?: Date;
  className?: string;
  onChange: (e: Date) => void | undefined;
};

type HandleChangeEvent = {
  target: {
    value: Date;
  };
};

export default function FormDatepicker({
  name,
  value,
  maxDate,
  minDate,
  className,
  onChange,
}: Props) {
  const options = getDatepickerOptions(maxDate, minDate, name, {
    prev: () => <FaAngleLeft />,
    next: () => <FaAngleRight />,
  });

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value instanceof Date ? value : new Date());
  const handleChange = (date: HandleChangeEvent["target"]["value"]) => {
    setSelectedDate(date);
    onChange(date);
  };

  const ref = useOutsideClick(() => {
    setShow(false);
  });

  return (
    <div
      data-testid='datepicker-wrapper'
      ref={ref}
    >
      <Datepicker
        options={options}
        onChange={(date) => handleChange(date)}
        show={show}
        setShow={(state) => setShow(state)}
      >
        <div className={cn("flex w-full rounded-full bg-white", className)}>
          <input
            data-testid='datepicker-input'
            type='text'
            name={name}
            placeholder='Select date'
            value={selectedDate.toDateString()}
            onFocus={() => setShow(true)}
            readOnly
            className={cn(
              "w-full rounded-full border-0 py-2 px-4  placeholder:text-gray-400 focus-visible:border-none focus-visible:ring-inset focus-visible:outline-base-green-500 focus:ring-2 focus:ring-inset focus:ring-base-green-500 sm:text-sm",
              className
            )}
          />
        </div>
      </Datepicker>
    </div>
  );
}
