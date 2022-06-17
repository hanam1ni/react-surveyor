import { faker } from '@faker-js/faker';

const MODELS: { [key: string]: () => object } = {
  survey: () => ({
    id: faker.random.alphaNumeric(8),
    title: faker.lorem.word(),
    description: faker.lorem.sentences(),
    coverImageUrl: faker.image.imageUrl(),
  }),
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

export const buildBatchInfo = (list: object[], batch = 1): object => ({
  batch,
  totalBatches: Math.ceil(list.length / 5),
  batchSize: 5,
  totalRecords: list.length,
});
