/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        "extra-light": 100,
        "semi-bold": 600,
        "extra-bold": 900,
        regular: 400,
      },
    },
  },
  plugins: [],
};
