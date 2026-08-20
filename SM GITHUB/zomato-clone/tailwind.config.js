/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zomato: {
          red: '#EF4F5F',
          lightred: '#FFEBEE',
          dark: '#1C1C1C',
          gray: '#F5F5F5',
        }
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
