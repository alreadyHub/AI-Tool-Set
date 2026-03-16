/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#0a0a0f',
          1: '#111118',
          2: '#1a1a24',
          3: '#222230',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          soft: 'rgba(99,102,241,0.15)',
        },
        border: 'rgba(255,255,255,0.08)',
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

