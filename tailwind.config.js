module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'sm': ['0.85rem'],
      'base': ['1rem'],
      'lg': ['1.25rem'],
      'xl': ['1.5rem'],
      '2xl': ['2rem'],
    },
    extend: {
    },
  },
  plugins: [],
}
