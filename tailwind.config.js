// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,jsx}',
  './src/styles/tailwind-preserve.pcss',],
  safelist: [
  'text-gray-800',
  'dark:text-gray-200',
  'dark:text-white',
  'dark:bg-gray-800',
  'dark:bg-gray-900',
  'dark:text-gray-400',
  'dark:text-gray-500',
],
  theme: {
    extend: {},
  },
  plugins: [],
};
