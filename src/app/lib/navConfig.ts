import { logout } from "../actions/auth.actions";

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
    name: "Plant Care",
    href: "/plantCare",
  },
  {
    name: "Expenses",
    href: "/expenses",
  },
  {
    name: "Profile",
    type: "dropdown",
    icon: true,
    options: [
      {
        name: "Profile",
        href: "/user",
      },
      {
        name: "Logout",
        type: "button",
        action: logout,
      },
    ],
  },
];
