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
          "100%": { marginTop: "10px" },
        },
        "gradient-x": {
          "0%": {
            "background-size": "300% 100%",
            "background-position": "right",
          },
          "100%": {
            "background-size": "300% 100%",
            "background-position": "left",
          },
        },
      },
      animation: {
        "gradient-x": "gradient-x 2s ease infinite",
        "slide-notification-in": "slide-notification-in 1s ease-in-out",
      },
      backgroundImage: {
        "skeleton-shine":
          "linear-gradient(90deg, #71717a 33%, #d4d4d8 50%,#71717a 66%)",
      },
    },
  },
  plugins: [],
};
