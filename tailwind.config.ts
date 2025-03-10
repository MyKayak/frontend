import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#89b4fa",
          "secondary": "#f5c2e7",
          "accent": "#94e2d5",
          "neutral": "#11111b",
          "base-100": "#1e1e2e",
          "info": "#74c7ec",
          "success": "#a6e3a1",
          "warning": "#f9e2af", 
          "error": "#f38ba8"
        }
      }
    ]
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [ require('daisyui'), require("@catppuccin/tailwindcss")]
} satisfies Config;
