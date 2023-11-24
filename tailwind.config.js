/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
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
        "fade-notification-in": "fade-in 1s ease-in-out",
        "fade-modal-in": "fade-in 0.4s ease-in-out",
      },
      backgroundImage: {
        "skeleton-shine":
          "linear-gradient(90deg, #71717a 33%, #d4d4d8 50%,#71717a 66%)",
      },
    },
  },
  plugins: [],
};
