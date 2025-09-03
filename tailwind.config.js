/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 15% 95%)',
        text: 'hsl(220 10% 15%)',
        accent: 'hsl(262 70% 55%)',
        primary: 'hsl(220 100% 50%)',
        surface: 'hsl(220 15% 100%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}