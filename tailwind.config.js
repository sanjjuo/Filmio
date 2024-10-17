/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Outfit: ["Outfit-Regular", "sans-serif"],
        Outfitmd: ["Outfit-Medium", "sans-serif"],
        Outfitbold: ["Outfit-Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

