import type { Config } from "tailwindcss";
import { plantsUIPlugin } from "./plugins/plants-ui-plugin.ts";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#F5F8F2",
          dark: "#0D1B13",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1B2D23",
        },
        sidebar: {
          light: "#E5F0E4",
          dark: "#15271F",
        },
        card: {
          light: "#F1F5F0",
          dark: "#1F3429",
        },
        border: {
          light: "#DDE7DE",
          dark: "#2B4537",
        },
        primary: {
          DEFAULT: "#4B8F61", // text-primary
          light: "#4B8F61",
          dark: "#6FCF97",
        },
        accent: {
          light: "#A7D7B2",
          dark: "#81C784",
        },
        text: {
          light: "#1F2D1F",
          dark: "#E8F5E9",
        },
        muted: {
          light: "#6B7D6B",
          dark: "#A8BDA8",
        },
        error: {
          light: "#D9534F",
          dark: "#FF6B6B",
        },
        warning: {
          light: "#ECA400",
          dark: "#FFD166",
        },
        edit: {
          light: "#4C9C9A",
          dark: "#3E8280",
          DEFAULT: "#4C9C9A",
        },
      },
      fontFamily: {
        sans: ["\"Fredoka\"", "sans-serif"],
      },
    },
  },
  plugins: [plantsUIPlugin],
};

export default config;
