export const NAVIGATION_CONFIG = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Plants List",
    type: "dropdown",
    options: [
      {
        name: "Collection",
        href: "/plants/collected",
      },
      {
        name: "Sold",
        href: "/plants/sold",
      },
      {
        name: "Purchased",
        href: "/plants/purchased",
      },
    ],
  },
  {
    name: "Plant Protection",
    href: "/plant-protection",
  },
  {
    name: "Expenses",
    href: "/expenses",
  },
  {
    name: "Profile",
    href: "/user",
  },
];
