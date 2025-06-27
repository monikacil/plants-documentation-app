import plugin from "tailwindcss/plugin";

export const plantsUIPlugin = plugin(function ({addComponents, addUtilities}) {
    addComponents({
        ".btn": {
            "@apply relative rounded-full font-semibold shadow text-white transition whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50": {},
        },
        ".btn-primary": {
            "@apply bg-primary-light dark:bg-primary-dark/80 hover:bg-primary-light/90 dark:hover:bg-primary-dark/70": {},
        },
        ".btn-outline": {
            "@apply border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark bg-transparent hover:bg-primary-light/70 hover:text-white dark:hover:bg-primary-dark dark:hover:text-black": {},
        },
        ".btn-danger": {
            "@apply bg-error-light dark:bg-error-dark hover:opacity-90": {},
        },
        ".btn-edit": {
            "@apply bg-edit hover:bg-edit-dark": {},
        },
        ".btn-facebook": {
            "@apply bg-[#1877F2] hover:bg-[#145DBF]": {},
        },
        ".btn-google": {
            "@apply bg-white border border-gray-300 text-black hover:bg-gray-300": {},
        },
        ".btn-link": {
            "@apply md:shadow-none bg-white dark:bg-edit md:bg-transparent md:dark:bg-transparent text-edit-light dark:text-text-dark hover:underline": {},
        },
        ".card": {
            "@apply p-6 rounded-xl bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark shadow": {},
        },
        ".input": {
            "@apply w-full px-3 py-2.5 md:px-4 md:py-2 text-base md:text-sm rounded-full border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder-muted-light dark:placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition": {},
        },
        ".input-invalid": {
            "@apply bg-red-50 border-red-500 text-red-700 placeholder-red-400 focus:ring-red-500": {},
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
        ".error-message": {
            "@apply text-sm text-red-600 mt-1": {},
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
            from: {opacity: "0"},
            to: {opacity: "1"},
        },
        "@keyframes slide-up": {
            from: {opacity: "0", transform: "translateY(20px)"},
            to: {opacity: "1", transform: "translateY(0)"},
        },
        "@keyframes bounce-once": {
            "0%, 100%": {transform: "translateY(0)"},
            "50%": {transform: "translateY(-10px)"},
        },
    });
});
