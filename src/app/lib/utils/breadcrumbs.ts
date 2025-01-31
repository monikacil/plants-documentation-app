import { capitalizeFirstLetter } from "./others";

export default function getBreadcrumbsLinks(url: string) {
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
