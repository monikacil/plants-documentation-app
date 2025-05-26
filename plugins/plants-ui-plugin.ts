import plugin from "tailwindcss/plugin";

export const plantsUIPlugin = plugin(function({ addComponents, addUtilities }) {
  addComponents({
    ".btn-primary": {
      "@apply px-4 py-2 font-semibold rounded-lg shadow text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 transition": {},
    },
    ".btn-outline": {
      "@apply px-4 py-2 font-semibold rounded-lg border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark bg-transparent hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-black transition": {},
    },
    ".btn-danger": {
      "@apply px-4 py-2 font-semibold rounded-lg bg-error-light dark:bg-error-dark text-white hover:opacity-90 transition": {},
    },
    ".btn-edit": {
      "@apply px-4 py-2 font-semibold rounded-lg text-white bg-edit hover:bg-edit-dark transition": {},
    },
    ".card": {
      "@apply p-6 rounded-xl bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark shadow": {},
    },
    ".input": {
      "@apply w-full px-4 py-2 rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder-muted-light dark:placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition": {},
    },
    ".alert-success": {
      "@apply p-4 rounded-md bg-primary-light dark:bg-primary-dark text-white text-sm animate-fade-in": {},
    },
    ".alert-warning": {
      "@apply p-4 rounded-md bg-warning-light dark:bg-warning-dark text-black text-sm animate-slide-up": {},
    },
    ".alert-error": {
      "@apply p-4 rounded-md bg-error-light dark:bg-error-dark text-white text-sm animate-bounce-once": {},
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

  addComponents({
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
});
