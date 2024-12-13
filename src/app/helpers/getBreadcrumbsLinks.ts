export function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function getBreadcrumbsLinks(url: string) {
  const splittedUrl = url.split('/')
  const links = splittedUrl.filter((el) => el !== "plants").map((el, idx) => {
    if (idx === 0) {
      return { name: 'Dashboard', href: '/dashboard' }
    }
    if (idx === 1 && splittedUrl.length > 3) {
      return { name: `${capitalizeFirstLetter(el)} Plants`, href: '/plants/' + el }
    }
    if (idx === 1) {
      return { name: `${capitalizeFirstLetter(el)} Plants` }
    }
    return { name: "Plant Details" }
  })

  return links
}
