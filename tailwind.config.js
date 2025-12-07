/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index-react.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'matrix-green': '#0f0',
        'dark-bg': '#000',
        'gold': '#FFD700',
      },
      animation: {
        'glitch': 'glitch 5s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 98%, 100%': { transform: 'translate(0)' },
          '99%': { transform: 'translate(-2px, 1px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 215, 0, 0.5)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(10px)' },
        }
      }
    },
  },
  plugins: [],
}
