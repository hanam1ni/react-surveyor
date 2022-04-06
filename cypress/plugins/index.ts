require('dotenv').config({ path: '.env.test' });

module.exports = (on: any, config: { env: object }) => {
  config.env = process.env;

  return config;
};
