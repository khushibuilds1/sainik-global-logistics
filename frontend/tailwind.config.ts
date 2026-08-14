import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red':      '#F0064F',
        'brand-red-dark': '#C0043D',
        'brand-dark':     '#0B0F14',
        'brand-dark-2':   '#111720',
        'brand-dark-3':   '#161D27',
        'brand-dark-card':'#0F1520',
        'brand-gray':     '#5A5A5A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'spin-slow':    'spin 25s linear infinite',
        'pulse-glow':   'pulse-glow 2.5s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'marquee':      'marquee 35s linear infinite',
        'marquee-rev':  'marqueeRev 35s linear infinite',
        'fade-up':      'fadeUp 0.6s ease forwards',
        'loader-line':  'loaderLine 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(240,6,79,0.2)' },
          '50%':      { boxShadow: '0 0 60px rgba(240,6,79,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        loaderLine: {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '49%':  { transform: 'scaleX(1)', transformOrigin: 'left' },
          '51%':  { transform: 'scaleX(1)', transformOrigin: 'right' },
          '100%': { transform: 'scaleX(0)', transformOrigin: 'right' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'red-gradient':    'linear-gradient(135deg,#F0064F 0%,#B00038 100%)',
      },
    },
  },
  plugins: [],
}

export default config
