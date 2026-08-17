import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f2a4a",
          50: "#eef3f8",
          100: "#d6e1ec",
          400: "#3d5c7d",
          600: "#16324f",
          700: "#0f2a4a",
          800: "#0b2039",
          900: "#081a2e",
        },
        sand: {
          DEFAULT: "#f7f5f0",
          50: "#fbfaf7",
          100: "#f7f5f0",
          200: "#efece2",
        },
        gold: {
          DEFAULT: "#b98d4f",
          400: "#c9a469",
          500: "#b98d4f",
          600: "#9c7440",
        },
        ink: "#1c2b3a",
        muted: "#5b6b7b",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(15, 42, 74, 0.18)",
        soft: "0 4px 20px rgba(15, 42, 74, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
