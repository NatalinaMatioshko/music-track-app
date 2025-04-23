/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        in: "in 0.2s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-in-from-bottom-4": "slideInFromBottom4 0.2s ease-out",
        "slide-in-from-top-4": "slideInFromTop4 0.2s ease-out",
      },
      keyframes: {
        in: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInFromBottom4: {
          "0%": { transform: "translateY(1rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInFromTop4: {
          "0%": { transform: "translateY(-1rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
