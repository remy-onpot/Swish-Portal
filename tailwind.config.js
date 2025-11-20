/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line is CRITICAL
  ],
  theme: {
    extend: {
      colors: {
        'swish-darkblue': '#4a78a6',
        'swish-lightblue': '#dce1e7',
        'swish-accent': '#ffbfc',
        'swish-black': '#1b2232',
      },
    },
  },
  plugins: [],
}