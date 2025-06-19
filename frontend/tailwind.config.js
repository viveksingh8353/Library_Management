/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
       fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'library-bg': "url('/libraryBG.jpg')",
      },
    },
  },
  plugins: [],
}
