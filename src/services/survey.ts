import { get, PageMeta } from 'utils/httpClient';
import { getUserToken } from 'utils/userToken';

export interface Survey {
  id: string;
  title: string;
  description: string;
  coverImageThumbnailUrl: string;
  coverImageUrl: string;
}

interface SurveyReponse {
  surveys: Survey[];
  meta: PageMeta;
}

export const listSurveys = async (options = {}): Promise<SurveyReponse> => {
  const { accessToken } = getUserToken();

  const response = await get('/surveys', {
    headers: { Authorization: `Bearer ${accessToken}` },
    ...options,
  });

  return {
    surveys: response.data.map((survey: any) => parseSurvey(survey)),
    meta: response.meta,
  };
};

const parseSurvey = (surveyResponse: any): Survey => ({
  id: surveyResponse.id,
  title: surveyResponse.attributes.title,
  description: surveyResponse.attributes.description,
  coverImageThumbnailUrl: surveyResponse.attributes.coverImageUrl,
  coverImageUrl: `${surveyResponse.attributes.coverImageUrl}l`,
});
