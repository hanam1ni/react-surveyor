import { faker } from '@faker-js/faker';

interface FactoryObject {
  [key: string]: string;
}

const MODELS: { [key: string]: () => FactoryObject } = {
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

export const build = (name: string, attrs = {}): FactoryObject => ({
  ...MODELS[name](),
  ...attrs,
});
