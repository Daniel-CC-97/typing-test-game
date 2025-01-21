/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        correct: "#90ee90", // Light green for correct typing
        incorrect: "#f87171", // Light red for incorrect typing
        current: "#ffffff", // White for the current letter
        background: "#121212", // Dark background for the app
        text: "#9ca3af", // Light grey text for the game
        darkGray: "#333333", // Dark grey for borders, shadows, etc.
        lightGray: "#b0b0b0", // Lighter grey for less important text or elements
        borderGray: "#444444", // Slightly lighter grey for borders or lines
        primary: "#1f2937", // Dark slate for general usage
        secondary: "#4b5563", // Medium grey for general usage
        accent: "#3b82f6", // Accent blue for buttons or highlighted elements
        neutral: "#6b7280", // Neutral grey for background or disabled elements
      },
    },
  },
  plugins: [],
};
