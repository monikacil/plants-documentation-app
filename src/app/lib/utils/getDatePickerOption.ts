import {ReactElement} from "react";

export function getDatepickerOptions(
    maxDate: Date | undefined,
    minDate: Date | undefined,
    name: string,
    icons: {
        prev: () => ReactElement | JSX.Element;
        next: () => ReactElement | JSX.Element;
    }
) {
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
    };
}
