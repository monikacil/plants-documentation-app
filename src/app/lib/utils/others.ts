import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function generateUniqKey(string: string) {
  return `${string}-${(Math.random() + 1).toString(9)}`;
}

export function getBreadcrumbsLinks(url: string) {
  const splittedUrl = url.split("/");
  const links = splittedUrl
    .filter((el) => el !== "plants")
    .map((el, idx) => {
      if (idx === 0) {
        return { name: "Dashboard", href: "/dashboard" };
      }
      if (idx === 1) {
        return {
          name: `${capitalizeFirstLetter(el)} Plants`,
          href: "/plants/" + el,
        };
      }
      if (idx > 1 && ["add", "edit", "delete"].includes(el)) {
        return {
          name: capitalizeFirstLetter(el),
          href: `/plants/${splittedUrl[1]}/${splittedUrl[2]}/${el}`,
        };
      }
      return {
        name: `Plant Details (${el})`,
        href: `/${splittedUrl[1]}/${splittedUrl[2]}/${el}`,
      };
    });

  return links;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
