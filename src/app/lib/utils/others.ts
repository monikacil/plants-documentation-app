import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function generateUniqKey(string: string) {
  return `${string}-${(Math.random() + 1).toString(9)}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
