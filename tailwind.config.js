module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      width: {
        '500': '500px',
        '520': '520px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}