import { deserialize } from 'deserialize-json-api';
import { partition, sortBy } from 'lodash';

import { get } from 'utils/httpClient';
import { BatchInfo, parseBatchInfo } from 'utils/pagination';
import { getUserToken } from 'utils/userToken';
import {
  Survey,
  SurveyDetail,
  SurveyQuestion,
  SurveyAnswer,
} from './surveyInterfaces';

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

const parseSurvey = (surveyResponse: any): Survey => ({
  id: surveyResponse.id,
  title: surveyResponse.title,
  description: surveyResponse.description,
  coverImageThumbnailUrl: surveyResponse.coverImageUrl,
  coverImageUrl: `${surveyResponse.coverImageUrl}l`,
});

const parseSurveyDetail = (surveyDetailResponse: any): SurveyDetail => {
  let surveyIntro, surveyOutro, questions;

  [[surveyIntro], questions] = partition(
    surveyDetailResponse.questions,
    (question) => question.displayType == 'intro'
  );

  [[surveyOutro], questions] = partition(
    questions,
    (question) => question.displayType == 'outro'
  );

  const parsedQuestions = questions.map((question) =>
    parseSurveyQuestion(question)
  );

  return {
    ...parseSurvey(surveyDetailResponse),
    intro: parseSurveyQuestion(surveyIntro),
    outro: parseSurveyQuestion(surveyOutro),
    questions: sortRecords(parsedQuestions),
  };
};

const parseSurveyQuestion = (questionResponse: any): SurveyQuestion => {
  const parsedAnswer = (<object[] | undefined>questionResponse.answers)?.map(
    (answer) => parseSurveyAnswer(answer)
  );

  return {
    id: questionResponse.id,
    displayOrder: questionResponse.displayOrder,
    coverImageUrl: `${questionResponse.coverImageUrl}l`,
    displayType: questionResponse.displayType,
    text: questionResponse.text,
    pick: questionResponse.pick,
    answers: parsedAnswer ? sortRecords(parsedAnswer) : null,
  };
};

const parseSurveyAnswer = (answerResponse: any): SurveyAnswer => ({
  id: answerResponse.id,
  displayOrder: answerResponse.displayOrder,
  text: answerResponse.text,
});

const sortRecords = (records: object) =>
  sortBy(records, [({ displayOrder }) => displayOrder]);
