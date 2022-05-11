module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/auth-background.svg')",
      },
      fontFamily: {
        neuzeit: ['NeuzeitSLTStd'],
      },
    },
  },
  plugins: [],
};
