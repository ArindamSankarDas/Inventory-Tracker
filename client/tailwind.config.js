/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#86B6F6",
        secondary: "#EEF5FF",
        concentrated: "#B4D4FF",
        tertiary: "#176B87",
        error_color: "#ffe4ea",
      },
      dropShadow: {
        "3xl-white": "-1px 4px 10px #545454",
      },
    },
  },
  plugins: [],
};
