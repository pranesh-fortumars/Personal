/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#FAFAF7',
        sapphire: {
          DEFAULT: '#173A70',
          deep: '#102B4C',
          midnight: '#0A1C35',
        },
        emerald: {
          DEFAULT: '#176B55',
          sage: '#DCE8DE',
        },
        champagne: {
          DEFAULT: '#C5A46D',
          light: '#E6D4A8',
          deep: '#A8854F',
        },
        ivory: '#F4EFE5',
      },
      fontFamily: {
        display: ['"DM Serif Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', '"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        bodoni: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Serif Tamil"', '"Noto Sans Tamil"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
        widest4: '0.5em',
      },
      lineHeight: {
        'extra-tight': '1.05',
        'display': '1.1',
        'relaxed2': '1.75',
      },
      boxShadow: {
        'luxury': '0 20px 60px -15px rgba(16, 43, 76, 0.18), 0 8px 25px -10px rgba(197, 164, 109, 0.12)',
        'luxury-lg': '0 35px 90px -20px rgba(16, 43, 76, 0.25), 0 15px 40px -15px rgba(197, 164, 109, 0.15)',
        'card': '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 25px 70px rgba(0,0,0,0.18), 0 10px 30px rgba(197,164,109,0.15)',
        'inner-gold': 'inset 0 1px 0 0 rgba(197, 164, 109, 0.25)',
        'glow-gold': '0 0 40px rgba(197, 164, 109, 0.25)',
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-slower': 'floatSlow 12s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'fade-up-soft': 'fadeUpSoft 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'breathe': 'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUpSoft: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        breathe: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
