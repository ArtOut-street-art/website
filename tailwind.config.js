/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f6f6f9",
        card: "#fff7fa",
        primary: "#a3c4f3",
        accent: "#fbc2eb",
        secondary: "#b6eadf",
        yellow: "#fffacc",
        orange: "#ffd6a5",
        purple: "#d4bfff",
        pastelgray: "#e0e7ef",
        darkgray: "#525a6f",
        "artout-blue": "#4e79ff",
        "artout-yellow": "#f8d24d",
        "artout-pink": "#f472b6",
      },
      fontFamily: {
        display: ["'Quicksand'", "sans-serif"],
        mono: ["'Fira Mono'", "monospace"],
        sunda: ["'Sundae Plush'", "cursive", "system-ui"],
        akadylan: ["'Sundae Plush'", "cursive", "system-ui"], // placeholder same font
        artout: ["'Bricks'", "cursive", "sans-serif"],
      },
      boxShadow: {
        pastel: "0 4px 32px 0 #b9e2fa33",
      },
    },
  },
  plugins: [],
}
