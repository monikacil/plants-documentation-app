import type { Config } from "tailwindcss";
import { plantsUIPlugin } from "./src/plugins/plants-ui-plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "media", // ✅ system preference
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "80%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeInOut: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "spin-slow": "spin 2.8s linear infinite",
        fade: "fadeInOut 1.2s ease-in-out",
        "fade-in": "fade-in 0.7s ease-in-out both",
        "pop-in": "pop-in 0.5s cubic-bezier(0.7,1.4,0.9,1) both",
      },
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
          DEFAULT: "#3B7A57",
          light: "#4B8F61",
          dark: "#6FCF97",
        },
        accent: {
          DEFAULT: "#5DAE6C",
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
        },
      },
      maxWidth: {
        "8xl": "95rem",
      },
      fontFamily: {
        sans: ['"Fredoka"', "sans-serif"],
      },
    },
  },
  plugins: [plantsUIPlugin, tailwindcssAnimate],
};

export default config;
