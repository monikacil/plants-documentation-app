import type { Config } from "tailwindcss";
import {content, plugin} from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-fredoka)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-green-0': "#fbfff8",
        'primary-green-50': '#58a773',
        'primary-green-100': '#4d8f63',
        'base-green': {
          100: "#d4d9d9",
          200: "#a9b4b2",
          300: "#7e8e8c",
          400: "#536965",
          500: "#28433f",
          600: "#203632",
          700: "#182826",
          800: "#101b19",
          900: "#080d0d"
        },
        'primary-light-green': '#cde5d5',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        'text-6xl': '2.75rem',
        'text-7xl': '3.75rem',
      },
      lineHeight: {
        '11': '3rem',
        '12': '6.25rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [
    plugin(),
  ],
};
export default config;
