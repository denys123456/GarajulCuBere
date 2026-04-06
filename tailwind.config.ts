import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        carbon: "#111111",
        graphite: "#191919",
        smoke: "#272727",
        amber: "#d4a45d",
        bronze: "#8b6531",
        champagne: "#f4debd"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(212, 164, 93, 0.15)",
        panel: "0 20px 60px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at top, rgba(212,164,93,0.18), transparent 26%), radial-gradient(circle at bottom right, rgba(139,101,49,0.22), transparent 22%)"
      }
    }
  },
  plugins: []
};

export default config;
