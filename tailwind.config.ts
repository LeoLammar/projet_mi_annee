import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      customDarkGrey: "#353535",
        customTeal: "#3c6e71",
        customWhite: "#FFFFFF",
        customGray: "#D9D9D9",
        customDarkTeal: "#284B63",
    },
  },
  plugins: [],
} satisfies Config;
