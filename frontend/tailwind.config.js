/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Inter", "sans-serif"],
      },

      fontWeight: {
        medium: "500",
      },

      boxShadow: {
        shadow: "rgba(0, 0, 0, 0.3) 0px 3px 8px",
        shadowTable: "rgba(0, 0, 0, 0.05) 0px 3px 8px",
      },

      backgroundColor: {
        normalGray: "#EEEEEE",
        mainColor: "#ef0a21",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
