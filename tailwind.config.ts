import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Accent — Gold (extracted from invitation card mandala ornaments)
        gold: {
          50:  "#fdf9ec",
          100: "#faf0cc",
          200: "#f5de97",
          300: "#efc762",
          400: "#e8b238",
          500: "#C9973A", // ← primary gold accent
          600: "#B8831E",
          700: "#96680F",
          800: "#7A5310",
          900: "#5c3e0e",
        },
        // Secondary — Cream/Off-white (invitation card background)
        cream: {
          50:  "#FEFDF9",
          100: "#FDF8F0",
          200: "#FAF3E8",
          300: "#F5ECD8",
          400: "#EDE1CA",
          500: "#E5D5B8",
        },
        // Deep Charcoal — body text
        charcoal: {
          50:  "#f5f5f5",
          100: "#e0e0e0",
          200: "#bdbdbd",
          300: "#9e9e9e",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#2C2C2C", // ← body text color
          800: "#1a1a1a",
          900: "#0d0d0d",
        },
      },
      fontFamily: {
        script:  ["Great Vibes", "cursive"],    // Names & headings
        display: ["Playfair Display", "serif"],  // Sub-headings
        body:    ["Lato", "sans-serif"],          // Body text
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9973A 0%, #E8B238 40%, #F5DE97 70%, #C9973A 100%)",
        "cream-gradient": "linear-gradient(180deg, #FEFDF9 0%, #FDF8F0 50%, #FAF3E8 100%)",
      },
      animation: {
        "spin-slow":   "spin 20s linear infinite",
        "pulse-slow":  "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer":     "shimmer 2.5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(201,151,58,0.35), 0 0 60px rgba(201,151,58,0.15)",
        "gold-sm":   "0 2px 8px rgba(201,151,58,0.30)",
        "luxury":    "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(201,151,58,0.20)",
      },
    },
  },
  plugins: [],
};

export default config;
