import { deserialize } from 'deserialize-json-api';

import { get, post } from 'utils/httpClient';
import { BatchInfo, parseBatchInfo } from 'utils/pagination';
import { getUserToken } from 'utils/userToken';
import {
  RatingType,
  Survey,
  SurveyAnswer,
  SurveyDetail,
  SurveyQuestion,
  SurveyResponse,
} from './surveyInterfaces';

interface SurveyList {
  surveys: Survey[];
  batchInfo: BatchInfo;
}

export const listSurveys = async (options = {}): Promise<SurveyList> => {
  const { accessToken } = getUserToken();

  const response = await get('/surveys', {
    headers: { Authorization: `Bearer ${accessToken}` },
    ...options,
  });

  const deserializedResponse = await deserialize(response);

  return {
    surveys: deserializedResponse.data.map((survey: any) =>
      parseSurvey(survey)
    ),
    batchInfo: parseBatchInfo(response.meta),
  };
};

export const getSurveyDetail = async (surveyId: string) => {
  const { accessToken } = getUserToken();

  const response = await get(`/surveys/${surveyId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const deserializedResponse = await deserialize(response);

  return parseSurveyDetail(deserializedResponse.data);
};

export const getInvalidResponseOrders = (
  surveyResponses: SurveyResponse[],
  currentSurvey: SurveyDetail
) => {
  const responseQuestionIds = surveyResponses.map(
    ({ questionId }) => questionId
  );

  return currentSurvey.questions
    .filter(({ isMandatory }) => isMandatory)
    .filter(({ id: questionId }) => !responseQuestionIds.includes(questionId))
    .map(({ displayOrder }) => displayOrder);
};

export const submitSurveyResponse = (
  surveyId: string,
  surveyResponses: SurveyResponse[]
) => {
  const { accessToken } = getUserToken();

  const requestBody = {
    survey_id: surveyId,
    questions: surveyResponses.map(({ questionId, ...response }) => ({
      id: questionId,
      ...response,
    })),
  };

  return post('/responses', requestBody, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const parseSurvey = (surveyResponse: any): Survey => ({
  id: surveyResponse.id,
  title: surveyResponse.title,
  description: surveyResponse.description,
  coverImageThumbnailUrl: surveyResponse.coverImageUrl,
  coverImageUrl: `${surveyResponse.coverImageUrl}l`,
});

const parseSurveyDetail = (surveyDetailResponse: any): SurveyDetail => {
  const parsedQuestions = (<object[]>surveyDetailResponse.questions).map(
    (question) => parseSurveyQuestion(question)
  );

  const [surveyIntro] = parsedQuestions.filter(
    ({ displayType }) => displayType === 'intro'
  );
  const [surveyOutro] = parsedQuestions.filter(
    ({ displayType }) => displayType === 'outro'
  );
  const questions = parsedQuestions.filter(
    ({ displayType }) => displayType !== 'intro' && displayType !== 'outro'
  );

  return {
    ...parseSurvey(surveyDetailResponse),
    intro: surveyIntro,
    outro: surveyOutro,
    questions: sortRecords(questions),
  };
};

const parseSurveyQuestion = (questionResponse: any): SurveyQuestion => {
  const parsedAnswer =
    (<object[]>questionResponse.answers)?.map((answer) =>
      parseSurveyAnswer(answer)
    ) || [];

  return {
    id: questionResponse.id,
    displayOrder: questionResponse.displayOrder,
    coverImageUrl: `${questionResponse.coverImageUrl}l`,
    text: questionResponse.text,
    pick: questionResponse.pick,
    isMandatory: questionResponse.isMandatory,
    answers: sortRecords(parsedAnswer),
    ...parseDisplayType(questionResponse.displayType),
  };
};

const parseDisplayType = (rawDisplayType: string) => {
  if (Object.values(RatingType).includes(rawDisplayType as any)) {
    return {
      displayType: 'rating' as SurveyQuestion['displayType'],
      ratingType: rawDisplayType as RatingType,
    };
  }

  return { displayType: rawDisplayType as SurveyQuestion['displayType'] };
};

const parseSurveyAnswer = (answerResponse: any): SurveyAnswer => ({
  id: answerResponse.id,
  displayOrder: answerResponse.displayOrder,
  text: answerResponse.text,
  isMandatory: answerResponse.isMandatory,
});

const sortRecords = (records: any[]) =>
  records.sort(
    (firstRecord, secondRecord) =>
      firstRecord.displayOrder - secondRecord.displayOrder
  );
