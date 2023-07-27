/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        primary: "#f8aa19",
        secondary: "#1a2a53",
      },
    },
    screens: require("./tailwind.screens")
  },
};
