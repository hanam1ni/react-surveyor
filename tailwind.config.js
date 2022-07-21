const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      xs: ['0.75rem', '1.125rem'],
      md: ['1rem', '1.375rem'],
      xl: ['1.25rem', '1.625rem'],
      '2xl': ['1.375rem', '1.75rem'],
      '3xl': ['1.75rem', '2.125rem'],
      '4xl': ['2.125rem', '2.625rem'],
    },
    extend: {
      fontFamily: {
        neuzeit: ['NeuzeitSLTStd'],
      },
    },
  },
  plugins: [],
};
