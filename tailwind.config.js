/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      backgroundImage: {
        "horizontal-navbar-background":
          "url('https://media.discordapp.net/attachments/1069933973448441928/1070026186941530274/M1UyKQ2rvQdZ5TsNxnaS-3-nbmzv-transformed.jpeg?width=1440&height=352')",
      },
    },
  },
  daisyui: {
    styled: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    themes: [
      {
        lotr: {
          ...require("daisyui/src/theming/themes")["[data-theme=luxury]"],
          primary: "#9b6311",

          secondary: "#dad5c8",

          accent: "#e0a82e",

          neutral: "#20272d",

          "base-100": "#181b21",

          info: "#136988",

          success: "#84cc16",

          warning: "#f96d16",

          error: "#dc2626",
        },
      },
    ],
  },
};
