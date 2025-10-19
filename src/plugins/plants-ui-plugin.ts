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
    /* --- SIDEBAR --- */
    ".sidebar": {
      "@apply flex flex-col h-screen shadow-lg border-r border-border-light text-text-light bg-sidebar-light transition-all duration-300 ease-in-out": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "rgba(21,39,31,0.85)",
        backdropFilter: "blur(12px)",
        color: "#E8F5E9",
        borderColor: "#2B4537",
      },
    },

    ".sidebar-header": {
      "@apply flex items-center justify-between mb-2 h-16": {},
      "@media (prefers-color-scheme: dark)": {
        borderColor: "#2B4537",
      },
    },

    ".sidebar-link": {
      "@apply flex items-center gap-4 h-10 px-3 py-2 text-base font-medium rounded-xl transition-all duration-200 ease-out text-text-light hover:bg-border-light": {},
      "@media (prefers-color-scheme: dark)": {
        color: "#E8F5E9",
        "&:hover": {
          color: "#6FCF97",
          backgroundColor: "rgba(43,69,55,0.6)",
        },
      },
    },

    ".sidebar-link-active": {
      "@apply bg-primary-light text-white shadow-md": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#6FCF97",
        color: "#0D1B13",
        boxShadow: "0 0 10px rgba(111,207,151,0.3)",
      },
    },

    /* --- COLLAPSED SIDEBAR LINK --- */
    ".sidebar-link-collapsed": {
      "@apply justify-center px-0 gap-0": {},
      "@media (prefers-color-scheme: dark)": {
        "&:hover": {
          backgroundColor: "rgba(43,69,55,0.6)",
        },
      },
    },

    ".sidebar-toggle": {
      "@apply hidden md:flex p-3 mr-3 rounded-full hover:bg-border-light transition-colors duration-200": {},
      "@media (prefers-color-scheme: dark)": {
        "&:hover": { backgroundColor: "rgba(43,69,55,0.6)" },
      },
    },

    /* --- SIDEBAR GRADIENT (ciemny motyw) --- */
    ".sidebar-gradient-dark": {
      "@media (prefers-color-scheme: dark)": {
        backgroundImage:
          "linear-gradient(to bottom, rgba(21,39,31,0.9), rgba(13,27,19,0.95))",
        backdropFilter: "blur(14px)",
        borderColor: "rgba(43,69,55,0.6)",
      },
    },

    /* --- BUTTONS --- */
    ".btn": {
      "@apply relative rounded-full font-semibold shadow text-white whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50": {},
    },
    ".btn-primary": {
      "@apply bg-primary-light hover:bg-primary-light/90": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#6fcf97",
        color: "#1f2d1f",
        "&:hover": { backgroundColor: "#5dae6c" },
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
    ".btn-link": {
      "@apply inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-primary-light bg-primary-light/10 transition-all duration-200 ease-out hover:bg-primary-light/20 hover:text-primary-light": {},
      "@media (prefers-color-scheme: dark)": {
        "@apply text-primary-dark hover:text-primary-dark hover:bg-primary-dark/10 focus:ring-primary-dark": {},
      },
    },
    ".btn-facebook": {
      "@apply bg-[#1877F2] hover:bg-[#1877F2]/90 hover:shadow-lg text-white rounded-full transition-all duration-200 ease-out": {},
      "@media (prefers-color-scheme: dark)": {
        "@apply hover:bg-[#1877F2]/80": {},
      },
    },
    ".btn-google": {
      "@apply bg-gray-50 hover:bg-gray-200 border border-gray-300 text-gray-800 rounded-full transition-all duration-200 ease-out": {},
      "@media (prefers-color-scheme: dark)": {
        "@apply bg-surface-dark border-border-dark text-white hover:bg-border-dark/60": {},
      },
    },

    /* --- TOASTS --- */
    ".toast-base": {
      "@apply flex items-center justify-center gap-3 px-6 py-3 rounded-2xl shadow-lg border min-w-[280px] max-w-md text-center font-medium animate-pop-in transition-all duration-300 ease-out": {},
    },
    ".toast-success": {
      "@apply bg-primary-light text-white border-primary-light/60": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#6FCF97",
        color: "#0D1B13",
        borderColor: "rgba(111,207,151,0.6)",
      },
    },
    ".toast-error": {
      "@apply bg-error-light text-white border-error-light/60": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#FF6B6B",
        color: "#0D1B13",
        borderColor: "rgba(255,107,107,0.6)",
      },
    },
    ".toast-info": {
      "@apply bg-edit-light text-white border-edit-light/60": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#3E8280",
        color: "#E8F5E9",
        borderColor: "rgba(62,130,128,0.6)",
      },
    },
    ".toast-warning": {
      "@apply bg-warning-light text-black border-warning-light/60": {},
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#FFD166",
        color: "#0D1B13",
        borderColor: "rgba(255,209,102,0.6)",
      },
    },

    /* --- INPUTS & CARDS --- */
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

    /* --- ALERTS --- */
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

  addBase({
    "@keyframes leaf-sway": {
      "0%, 100%": { transform: "rotate(0deg)" },
      "50%": { transform: "rotate(4deg)" },
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
    ".animate-leaf-sway": {
      animation: "leaf-sway 3s ease-in-out infinite",
    },
  });
});
