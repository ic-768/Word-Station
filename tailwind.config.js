/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-notification-in": {
          "0%": { marginTop: "-300px" },
          "100%": { marginTop: "20px" },
        },
      },
      animation: {
        "slide-notification-in": "slide-notification-in 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
