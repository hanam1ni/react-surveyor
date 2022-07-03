import * as surveyService from 'services/survey';

import { get } from 'utils/httpClient';
import { getUserToken } from 'utils/userToken';

import { build } from '@support/factory';
import surveyDetailResponse from '@support/fixtures/surveyDetail.json';

jest.mock('utils/httpClient');
jest.mock('utils/userToken');

describe('listSurveys', () => {
  beforeEach(() => {
    const userToken = build('userToken');
    const mockedGetUserToken = getUserToken as jest.Mock;
    mockedGetUserToken.mockReturnValue(userToken);
  });

  it('parses survey response', async () => {
    const response = {
      data: [
        {
          id: 'd5de6a8f8f5f1cfe51bc',
          attributes: {
            title: 'Survey title',
            description: 'Survey description',
            coverImageUrl: 'https://image-url.com',
          },
        },
      ],
      meta: {
        batch: 1,
        totalBatches: 1,
        batchSize: 5,
        totalRecords: 1,
      },
    };
    const mockedGet = get as jest.Mock;
    mockedGet.mockResolvedValue(response);

    const { surveys: parsedSurveys } = await surveyService.listSurveys();

    expect(parsedSurveys[0].id).toEqual(response.data[0].id);
    expect(parsedSurveys[0].title).toEqual(response.data[0].attributes.title);
    expect(parsedSurveys[0].description).toEqual(
      response.data[0].attributes.description
    );
    expect(parsedSurveys[0].coverImageUrl).toEqual(
      `${response.data[0].attributes.coverImageUrl}l`
    );
    expect(parsedSurveys[0].coverImageThumbnailUrl).toEqual(
      response.data[0].attributes.coverImageUrl
    );
  });
});

describe('getSurveyDetail', () => {
  beforeEach(() => {
    const userToken = build('userToken');
    const mockedGetUserToken = getUserToken as jest.Mock;
    mockedGetUserToken.mockReturnValue(userToken);
  });

  it('parses the response to valid survey detail', async () => {
    const surveyId = 'd5de6a8f8f5f1cfe51bc';
    const response = surveyDetailResponse;
    const mockedGet = get as jest.Mock;
    mockedGet.mockResolvedValue(response);

    const parsedSurveyDetail = await surveyService.getSurveyDetail(surveyId);

    expect(parsedSurveyDetail.id).toEqual(surveyId);
    expect(parsedSurveyDetail.intro.displayType).toEqual('intro');
    expect(parsedSurveyDetail.outro.displayType).toEqual('outro');
    expect(parsedSurveyDetail.questions.length).toEqual(10);
  });

  describe('given survey with rating display type', () => {
    it('parses the response to valid survey question', async () => {
      const surveyId = 'd5de6a8f8f5f1cfe51bc';
      const response = surveyDetailResponse;
      const mockedGet = get as jest.Mock;
      mockedGet.mockResolvedValue(response);

      const parsedSurveyDetail = await surveyService.getSurveyDetail(surveyId);
      const ratingQuestion = parsedSurveyDetail.questions.find(
        ({ displayType }) => displayType === 'rating'
      );

      expect(ratingQuestion?.ratingType).toEqual('star');
    });
  });
});
