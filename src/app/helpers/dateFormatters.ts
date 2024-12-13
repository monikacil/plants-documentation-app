export function toDateFromUiDate(date: string | Date | null | undefined) {
  let newDate = new Date()
  if (typeof date === "string") {
    const [day, month, year] = date.split('.')
    newDate = new Date(+year, +month - 1, +day)
  }
  return newDate
}
