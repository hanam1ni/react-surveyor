import { faker } from '@faker-js/faker';

const MODELS: { [key: string]: () => object } = {
  survey: () => ({
    id: faker.random.alphaNumeric(8),
    title: faker.lorem.word(),
    description: faker.lorem.sentences(),
    coverImageUrl: faker.image.imageUrl(),
  }),
  surveyDetail: () => ({
    ...build('survey'),
    intro: build('surveyQuestion', { displayType: 'intro', answers: null }),
    outro: build('surveyQuestion', { displayType: 'outro', answers: null }),
    questions: [build('surveyQuestion')],
  }),
  surveyQuestion: () => ({
    id: faker.random.alphaNumeric(8),
    displayOrder: 1,
    coverImageUrl: faker.image.imageUrl(),
    displayType: 'textarea',
    text: faker.lorem.sentences(),
    pick: 'none',
    isMandatory: false,
    answers: [build('surveyAnswer')],
  }),
  surveyAnswer: () => ({
    id: faker.random.alphaNumeric(8),
    displayOrder: 1,
    text: faker.lorem.sentences(),
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
