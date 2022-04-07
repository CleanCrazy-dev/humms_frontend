module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      currentColor: 'currentColor',
      red: '#F94144',
      darkOrange: '#F3722C',
      lightOrange: '#F8961E',
      yellow: '#F9C74F',
      lightGreen: '#90BE6D',
      darkGreen: '#43AA8B',
      darkBlue: '#577590',
      white: '#fff',
      dark: "#181A1E"
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
