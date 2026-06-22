/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F3",
        "cream-deep": "#F4EEE3",
        charcoal: "#2B2926",
        "ink-soft": "#57534B",
        "ink-muted": "#8C857A",
        hairline: "#E6DFD2",
        terracotta: "#C06A4B",
        "terracotta-dk": "#A65638",
        sage: "#7E8E63",
        "sage-dk": "#627049",
        blue: "#6E8AA6",
        "blue-dk": "#536E89",
        marker: "#F2E0A0",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "22px",
        lg: "16px",
        md: "10px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,41,38,.04), 0 12px 32px -12px rgba(43,41,38,.12)",
        float: "0 2px 4px rgba(43,41,38,.05), 0 22px 48px -18px rgba(43,41,38,.22)",
      },
    },
  },
  plugins: [],
};
