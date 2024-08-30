/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["avenir", "sans-serif"],
      },
      colors: {
        "harvest-gold": {
          DEFAULT: "#c58700",
          50: "#fefce8",
          100: "#fffbc2",
          200: "#fff388",
          300: "#ffe543",
          400: "#ffd110",
          500: "#efb703",
          600: "#c58700",
          700: "#a46404",
          800: "#874e0c",
          900: "#734010",
          950: "#432105",
        },
        black: {
          DEFAULT: "#000000",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
