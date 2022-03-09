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
      },
    },
  },
  plugins: [],
}
