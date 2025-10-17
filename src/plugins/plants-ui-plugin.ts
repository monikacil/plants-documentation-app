import plugin from "tailwindcss/plugin";

export const plantsUIPlugin = plugin(({ addBase, addComponents, addUtilities }) => {
  addBase({
    "@keyframes fade-in": {
      from: { opacity: "0" },
      to: { opacity: "1" },
    },
    "@keyframes slide-up": {
      from: { opacity: "0", transform: "translateY(20px)" },
      to: { opacity: "1", transform: "translateY(0)" },
    },
    "@keyframes bounce-once": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  });

  addComponents({
    ".btn": {
      "@apply relative rounded-full font-semibold shadow text-white whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50": {},
    },
    ".btn-primary": {
      "@apply bg-primary-light hover:bg-primary-light/90": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#6FCF97",
        "&:hover": { backgroundColor: "#5DAE6C" },
      },
    },
    ".btn-outline": {
      "@apply border border-primary-light text-primary-light bg-transparent hover:bg-primary-light/70 hover:text-white": {},
      "@media (prefers-color-scheme: dark)": {
        borderColor: "#6FCF97",
        color: "#6FCF97",
        "&:hover": {
          backgroundColor: "#6FCF97",
          color: "#000",
        },
      },
    },
    ".btn-danger": {
      "@apply bg-error-light hover:opacity-90": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#FF6B6B",
      },
    },
    ".btn-edit": {
      "@apply bg-edit-light hover:opacity-90": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#3E8280",
      },
    },
    ".btn-facebook": {
      "@apply bg-[#1877F2] hover:bg-[#145DBF]": {},
    },
    ".btn-google": {
      "@apply bg-gray-100 border border-gray-300 text-black hover:bg-gray-300": {},
    },
    ".card": {
      "@apply p-6 rounded-xl bg-card-light text-text-light shadow transition-colors": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#1F3429",
        color: "#E8F5E9",
      },
    },
    ".input": {
      "@apply w-full px-4 py-2 text-base rounded-full border border-border-light bg-surface-light text-text-light placeholder-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#1B2D23",
        color: "#E8F5E9",
        borderColor: "#2B4537",
      },
    },
    ".alert-success": {
      "@apply p-4 rounded-md bg-primary-light text-white text-sm animate-fade-in": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#6FCF97",
      },
    },
    ".alert-warning": {
      "@apply p-4 rounded-md bg-warning-light text-black text-sm animate-slide-up": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#FFD166",
        color: "#000",
      },
    },
    ".alert-error": {
      "@apply p-4 rounded-md bg-error-light text-white text-sm animate-bounce-once": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#FF6B6B",
      },
    },
  });

  addUtilities({
    ".animate-fade-in": {
      animation: "fade-in 0.4s ease-out both",
    },
    ".animate-slide-up": {
      animation: "slide-up 0.5s ease-out both",
    },
    ".animate-bounce-once": {
      animation: "bounce-once 0.6s ease-out both",
    },
    ".animate-pulse-slow": {
      animation: "pulse 2s ease-in-out infinite",
    },
  });
});
