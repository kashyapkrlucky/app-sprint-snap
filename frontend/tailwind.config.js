/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-200': 'calc(100vh - 200px)',
      },
    },
  },
  plugins: [],
}
