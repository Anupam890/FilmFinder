/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        backGround: "#161B2F",
        secondary: "#E50102",
        white: "#FFFFFF",
        black: "#000000",
        primary: "#4A4A4A",
        highlight:"#FFD700",
      },
    },
  },
  plugins: [],
};
