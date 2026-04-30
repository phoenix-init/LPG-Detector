/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "sf-regular": ["sf-regular", "sans-serif"],
        "sf-semibold": ["sf-semibold", "sans-serif"],
        "sf-light": ["sf-light", "sans-serif"],
        "inter-bold": ["inter-bold", "sans-serif"]
      }
    }
  },
  plugins: [],
}