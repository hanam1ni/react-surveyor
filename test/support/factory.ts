import { faker } from '@faker-js/faker';

interface FactoryObject {
  [key: string]: string;
}

const MODELS: { [key: string]: () => FactoryObject } = {
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

export const build = (name: string, attrs = {}): FactoryObject => ({
  ...MODELS[name](),
  ...attrs,
});
