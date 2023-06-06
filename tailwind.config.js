/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                bglight: "url(/images/body-bg.png)",
                bgdark: "url(/images/dark-bg-long.png)",
            }),
            color: (theme) => ({
                darkcolor: "#000",
                lightcolor: "#fff",
            }),
        },
    },
    plugins: [require("flowbite/plugin")],
};