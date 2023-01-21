/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  themes: [
    {
      daisyui: {
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        themes: [
          {
            mytheme: {
              primary: "#6419E6",

              secondary: "#c084fc",

              accent: "#6b21a8",

              neutral: "#191D24",

              "base-100": "#2A303C",

              info: "#881337",

              success: "#84cc16",

              warning: "#f97316",

              error: "#dc2626",
            },
          },
        ],
      },
    },
    {
      extend: {},
    },
  ],
  plugins: [require("daisyui")],
};
