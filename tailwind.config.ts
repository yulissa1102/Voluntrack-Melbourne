import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14211f",
        paper: "#f6f8f4",
        gum: "#d84f46",
        river: "#2a7f8f",
        leaf: "#3d8b5f",
        sun: "#f0b63f"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(20, 33, 31, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
