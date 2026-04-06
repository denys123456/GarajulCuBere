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
        ink: "#2f241c",
        carbon: "#3e3025",
        graphite: "#68523f",
        smoke: "#8d7967",
        amber: "#b78b47",
        bronze: "#8f6a36",
        champagne: "#efe4d3",
        cream: "#f8f6f2",
        sand: "#efe7da"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 32px 80px rgba(126, 93, 48, 0.12)",
        panel: "0 18px 40px rgba(67, 46, 21, 0.08)"
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at top, rgba(183,139,71,0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(143,106,54,0.12), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
