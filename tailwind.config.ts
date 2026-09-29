import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F5F3",
        frame: "#111111",
        panel: "#FFFFFF",
        subtle: "#E6E6E2",
        accent: "#D94826",
        mustard: "#EDB13E",
        "google-blue": "#4C80F0",
        "google-red": "#D9503F",
        "google-green": "#4FA35A",
        "google-yellow": "#EDB13E",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px #111111",
        "brutal-sm": "2px 2px 0px #111111",
        "brutal-lg": "6px 6px 0px #111111",
      },
    },
  },
  plugins: [],
};

export default config;
