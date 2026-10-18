/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1265E8",
          cyan: "#00C8F8",
          violet: "#713CFF",
          pink: "#FF4FA3",
          gradient: "linear-gradient(110deg, #00C8F8 0%, #1265E8 45%, #713CFF 80%, #FF4FA3 100%)",
        },
        primary: {
          DEFAULT: "#1265E8",
          hover: "#00C8F8",
          dark: "#713CFF",
        },
        background: {
          DEFAULT: "#F7F9FC",
          dark: "#07152F",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#102749",
        },
        text: {
          primary: "#07152F",
          secondary: "#526079",
          dark: "#FFFFFF",
          secondaryDark: "#C4D0E4",
        },
        border: {
          light: "#DCE3ED",
        },
        // Re-route Tailwind orange to vibrant Brand Gradient Colors for seamless full-app theming
        orange: {
          50: "#f0f8ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#1265E8", // Brand Primary
          600: "#00C8F8", // Brand Cyan
          700: "#713CFF", // Brand Violet
          800: "#102749", // Surface Dark
          900: "#07152F", // Background Dark
          950: "#040c1b",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        heading: ["var(--font-syne)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        button: "10px",
        card: "16px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(110deg, #00C8F8 0%, #1265E8 45%, #713CFF 80%, #FF4FA3 100%)",
        "brand-radial":
          "radial-gradient(circle at 50% 50%, #00C8F8 0%, #1265E8 50%, #713CFF 100%)",
      },
    },
  },
  plugins: [],
};
