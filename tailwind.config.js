/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dwapar-bg': '#0b1020',        // Ye hi custom bg
        'temple-gold': '#D4AF37',
        'lotus-pink': '#F7C6D6',
        'peacock-blue': '#0b6e81'
      }
    }
  },
  plugins: [],
}
