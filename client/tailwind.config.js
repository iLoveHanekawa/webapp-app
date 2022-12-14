/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          wisteria: '#875F9A',
          bellflower: '#5D3F6A'
        }
      },
      fontFamily: {
        nunito: 'Nunito, sans-serif',
        inter: 'Inter, sans-serif',
        poppins: 'Poppins, sans-serif',
        roboto: 'Roboto, sans-serif'
      }
    },
  },
  plugins: [],
}