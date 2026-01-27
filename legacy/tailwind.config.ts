import type { Config } from "tailwindcss";
import catppuccin from '@catppuccin/daisyui'
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  daisyui: {
    themes: [
      catppuccin('mocha'),
      catppuccin('latte')
    ]
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'spin-reverse': 'spin 1s linear infinite reverse',
      }
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [ require('daisyui'), require("@catppuccin/tailwindcss")]
} satisfies Config;
