const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      '2xl': ['1.375rem', '1.75rem'],
      '3xl': ['1.75rem', '2.125rem'],
    },
    extend: {
      fontFamily: {
        neuzeit: ['NeuzeitSLTStd'],
      },
    },
  },
  plugins: [],
};
