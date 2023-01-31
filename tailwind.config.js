/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    themes: [
      {
        lotr: {
          ...require("daisyui/src/colors/themes")["[data-theme=luxury]"],
          primary: "#9b6311",

          secondary: "#e7b039",

          accent: "#136014",

          neutral: "#20272d",

          "base-100": "#181b21",

          info: "#136988",

          success: "#84cc16",

          warning: "#f96d16",

          error: "#dc2626",
        },
      },
      "luxury",
    ],
  },
};
