module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        192: '48rem',
        17: '4.25rem',
        18: '4.5rem',
        100: '25rem',
      },
      boxShadow: {
        'inner-xl': 'inset 0 0 7px 0 rgba(0, 0, 0, 0.3)',
        'inner-sm': 'inset 0 0 7px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0px 1px 1px darkgrey',
        },
        '.text-shadow': {
          textShadow: '0px 2px 3px darkgrey',
        },
        '.text-shadow-md': {
          textShadow: '0px 3px 3px darkgrey',
        },
        '.text-shadow-lg': {
          textShadow: '0px 5px 3px darkgrey',
        },
        '.text-shadow-xl': {
          textShadow: '0px 7px 3px darkgrey',
        },
        '.text-shadow-2xl': {
          textShadow: '0px 10px 3px darkgrey',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }

      addUtilities(newUtilities)
    },
  ],
}
