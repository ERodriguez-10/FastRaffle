/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        impresario: "#1d1238",
        customOrange: "#ffa988",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
