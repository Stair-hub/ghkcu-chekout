/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./checkout.html",
    "./src/checkout-main.tsx",
    "./src/components/Checkout.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'brand-copper': '#B87333',
        'brand-cyan': '#00bcd4',
        'brand-midnight': '#0f172a',
      }
    },
  },
  plugins: [],
}
