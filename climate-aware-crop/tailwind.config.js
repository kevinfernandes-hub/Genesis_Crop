/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-600': '#1A73E8',
        'blue-50': '#F8F9FA',
        'blue-100': '#E8F0FE',
        'blue-700': '#1765CC',
        'green-600': '#188038',
        'green-50': '#F1F3F1',
        'green-100': '#E6F4EA',
        'amber-600': '#F29900',
        'amber-50': '#FEF7E0',
        'amber-100': '#FCE5CD',
        'gray-50': '#F8F9FA',
        'gray-100': '#F3F3F3',
        'gray-200': '#E0E0E0',
        'gray-300': '#D0D0D0',
        'gray-400': '#C0C0C0',
        'gray-600': '#5F6368',
        'gray-800': '#3C4043',
        'gray-900': '#202124',
        'gray-950': '#0A0A0A',
      },
      fontFamily: {
        sans: ['system-ui', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
