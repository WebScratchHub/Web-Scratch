/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0D14',
        'text-main': '#E8EAF6',
        'text-secondary': '#9EA3B5',
        'muted': '#636A7B',
        primary: '#7B61FF',   // violet
        secondary: '#00E5FF', // cyan
        tertiary: '#FF5CF0',  // pink
        success: '#00FFB0',
        error: '#FF4D6D',
        warning: '#FFB300',
      },
      boxShadow: {
        'glow-violet-lg': '0 0 25px rgba(123, 97, 255, 0.25)',
        'glow-violet-md': '0 0 15px rgba(123, 97, 255, 0.2)',
        'glow-cyan-lg': '0 0 25px rgba(0, 229, 255, 0.3)',
        'glow-cyan-md': '0 0 12px rgba(0, 229, 255, 0.5)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #7B61FF, #00E5FF, #FF5CF0)',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 0%',
      },
    },
  },
  plugins: [],
}
