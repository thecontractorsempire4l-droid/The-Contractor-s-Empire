/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── The Contractors Empire brand palette ──────────────────
        empire: {
          navy: '#0A1733',     // deepest background (midnight)
          panel: '#0F1E40',    // raised surface
          surface: '#13234A',  // cards
          line: '#243457',     // hairline borders
          gold: '#E0A93B',     // primary accent (CTAs, ratings, badges)
          goldsoft: '#F2C66A', // accent highlight / hover
          steel: '#5B8DEF',    // secondary interactive (links)
          ink: '#EAF0FB',      // primary text
          mute: '#93A4C6',     // muted text
        },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 18px 40px -24px rgba(0,0,0,0.8)',
        gold: '0 10px 30px -10px rgba(224,169,59,0.45)',
      },
      backgroundImage: {
        'empire-grid':
          'linear-gradient(rgba(91,141,239,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,141,239,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
