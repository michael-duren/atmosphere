/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'black-texture': "url('/src/assets/img/black-texture.jpg')",
      },
      rotate: {
        270: '270deg',
      },
      fontFamily: {
        title: ['Megrim', 'cursive'],
        caps: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
