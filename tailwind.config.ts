import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-baskerville)', 'Georgia', 'serif'],
      },
      colors: {
        sand: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f3dac0',
          300: '#ebc296',
          400: '#e1a26a',
          500: '#d98949',
          600: '#cb723e',
          700: '#aa5a35',
          800: '#884931',
          900: '#6e3d2a',
        },
      },
    },
  },
  plugins: [],
}
export default config
