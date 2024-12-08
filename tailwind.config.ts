import type { Config } from "tailwindcss";
import {content, plugin} from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/flowbite/**/*.{js,ts}",
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
        'primary-dark-green': '#307834',
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('flowbite/plugin')
  ],
};
export default config;
