import { get } from 'utils/httpClient';
import { getUserToken } from 'utils/userToken';

export interface Survey {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
}

export const listSurveys = async (options = {}): Promise<Survey[]> => {
  const { accessToken } = getUserToken();

  const response = await get('/surveys', {
    headers: { Authorization: `Bearer ${accessToken}` },
    ...options,
  });

  return response.data.map((survey: any) => parseSurvey(survey));
};

const parseSurvey = (surveyResponse: any): Survey => ({
  id: surveyResponse.id,
  title: surveyResponse.attributes.title,
  description: surveyResponse.attributes.description,
  coverImageUrl: surveyResponse.attributes.coverImageUrl,
});
