/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        bglight: "#fff",
        bgdark: "#000",
      }),
      color: (theme) => ({
        darkcolor: "#000",
        lightcolor: "#fff",
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
};
