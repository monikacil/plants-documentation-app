import { twMerge } from "tailwind-merge"
import { clsx, ClassValue } from "clsx"
import { ReactElement } from "react";

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function generateUniqKey(string :string) {
  return `${ string }-${ (Math.random() + 1).toString(9) }`
}

export function getBreadcrumbsLinks(url: string) {
  const splittedUrl = url.split('/')
  const links = splittedUrl.filter((el) => el !== "plants").map((el, idx) => {
    if (idx === 0) {
      return { name: 'Dashboard', href: '/dashboard' }
    }
    if (idx === 1) {
      return { name: `${ capitalizeFirstLetter(el) } Plants`, href: '/plants/' + el }
    }
    if (idx > 1 && ["add", "edit", "delete"].includes(el)) {
      return { name: capitalizeFirstLetter(el), href: `/plants/${ splittedUrl[1] }/${ splittedUrl[2] }/${ el }` }
    }
    return { name: `Plant Details (${ el })` , href: `/${ splittedUrl[1] }/${ splittedUrl[2] }/${ el }` }
  })

  return links
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getDatepickerOptions(
  maxDate: Date | undefined,
  minDate: Date | undefined,
  name: string,
  icons: {
    prev: () => ReactElement | JSX.Element
    next: () => ReactElement | JSX.Element
}) {
    return {
      autoHide: true,
      maxDate: maxDate,
      minDate: minDate,
      todayBtn: false,
      clearBtn: false,
      theme: {
        background: "",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "",
        input: "",
        inputIcon: "",
        selected: "",
      },
      icons: icons,
      datepickerClassNames: "top-auto",
      defaultDate: new Date(),
      language: "en",
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      inputNameProp: name,
    }
}