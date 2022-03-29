import { faker } from '@faker-js/faker';

const MODELS: { [key: string]: () => object } = {
  user: () => ({
    avatar_url: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.name.findName(),
  }),
  userToken: () => ({
    access_token: faker.random.alphaNumeric(16),
    refresh_token: faker.random.alphaNumeric(16),
  }),
};

export const build = (name: string, attrs = {}) => ({
  ...MODELS[name](),
  ...attrs,
});
