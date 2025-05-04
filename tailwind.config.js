/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grocery: {
          light: '#F5F5F5',
          dark: '#333333',
          primary: '#4CAF50',
          secondary: '#FF9800',
          accent: '#2196F3'
        }
      },
      boxShadow: {
        'grocery': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
} 