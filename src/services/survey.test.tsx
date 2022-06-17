import * as surveyService from 'services/survey';

import { get } from 'utils/httpClient';
import { getUserToken } from 'utils/userToken';

import { build, buildBatchInfo } from '@support/factory';

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
