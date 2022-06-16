import { get } from 'utils/httpClient';
import { BatchInfo, parseBatchInfo } from 'utils/pagination';
import { getUserToken } from 'utils/userToken';

export interface Survey {
  id: string;
  title: string;
  description: string;
  coverImageThumbnailUrl: string;
  coverImageUrl: string;
}

interface SurveyResponse {
  surveys: Survey[];
  batchInfo: BatchInfo;
}

export const listSurveys = async (options = {}): Promise<SurveyResponse> => {
  const { accessToken } = getUserToken();

  const response = await get('/surveys', {
    headers: { Authorization: `Bearer ${accessToken}` },
    ...options,
  });

  return {
    surveys: response.data.map((survey: any) => parseSurvey(survey)),
    batchInfo: parseBatchInfo(response.meta),
  };
};

const parseSurvey = (surveyResponse: any): Survey => ({
  id: surveyResponse.id,
  title: surveyResponse.attributes.title,
  description: surveyResponse.attributes.description,
  coverImageThumbnailUrl: surveyResponse.attributes.coverImageUrl,
  coverImageUrl: `${surveyResponse.attributes.coverImageUrl}l`,
});
