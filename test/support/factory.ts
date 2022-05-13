import { faker } from '@faker-js/faker';

const MODELS: { [key: string]: () => object } = {
  user: () => ({
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.name.findName(),
  }),
  userToken: () => ({
    accessToken: faker.random.alphaNumeric(16),
    refreshToken: faker.random.alphaNumeric(16),
  }),
};

export const build = (name: string, attrs = {}): { [key: string]: any } => ({
  ...MODELS[name](),
  ...attrs,
});
