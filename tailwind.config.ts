import type { Config } from "tailwindcss";
import {content, plugin} from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
    content(),
  ],
  theme: {
    extend: {
      boxShadow: {
        "innerColor": "0 0 0px 1000px #343159 inset",
      },
      fontFamily: {
        sans: ["var(--font-fredoka)"],
      },
      colors: {
        "base-gray": {
          100: "#fbfbfb",
          200: "#f6f6f6",
          300: "#f2f2f2",
          400: "#ededed",
          500: "#e9e9e9",
          600: "#bababa",
          700: "#8c8c8c",
          800: "#5d5d5d",
          900: "#2f2f2f"
        },
        "base-green": {
          100: "#eaf2e0",
          150: "#e2f2ce",
          200: "#d5e5c2",
          300: "#c0d8a3",
          400: "#abcb85",
          500: "#96be66",
          600: "#799d4d",
          700: "#5a723d",
          800: "#3c4c29",
          900: "#1e2614"
        },
        danger: {
          500: "#ef4444",
          600: "#bf3636",
        },
        warning: {
          500: "#ffa53e",
          600: "#cc8432",
        },
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      textColor: {
        light: "#fff",
        dark: "#030303"
      }
    },
  },
  plugins: [
    plugin(),
  ],
};
export default config;
