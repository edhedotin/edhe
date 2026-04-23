/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(44 20% 97%)",
        foreground: "hsl(0 0% 11%)",
        card: "hsl(44 20% 97%)",
        "card-foreground": "hsl(0 0% 11%)",
        popover: "hsl(44 20% 97%)",
        "popover-foreground": "hsl(0 0% 11%)",
        primary: "hsl(0 0% 11%)",
        "primary-foreground": "hsl(44 20% 97%)",
        secondary: "hsl(40 14% 93%)",
        "secondary-foreground": "hsl(0 0% 11%)",
        muted: "hsl(40 14% 93%)",
        "muted-foreground": "hsl(0 0% 35%)",
        accent: "hsl(13 77% 52%)",
        "accent-foreground": "hsl(44 20% 97%)",
        destructive: "hsl(0 84.2% 60.2%)",
        "destructive-foreground": "hsl(0 0% 98%)",
        border: "hsl(40 14% 84%)",
        input: "hsl(40 14% 84%)",
        ring: "hsl(0 0% 11%)",
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "Satoshi", "sans-serif"],
        body: ["Satoshi", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["1.5rem", { lineHeight: "2rem" }],
        "display-base": ["2.25rem", { lineHeight: "2.5rem" }],
        "display-lg": ["3rem", { lineHeight: "1" }],
        "display-xl": ["3.75rem", { lineHeight: "1" }],
      },
      animation: {
        "edhe-pulse": "edhePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        edhePulse: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.8)",
            opacity: "0.4",
          },
        },
      },
      spacing: {
        radius: "0.125rem",
      },
    },
  },
  plugins: [],
};
