import React, { Dispatch, SetStateAction } from 'react';

import ChoiceAnswer from './ChoiceAnswer';
import NpsAnswer from './NpsAnswer';
import RatingAnswer from './RatingAnswer';
import TextareaAnswer from './TextareaAnswer';
import TextfieldAnswer from './TextfieldAnswer';
import {
  QuestionType,
  SurveyQuestion as SurveyQuestionInterface,
  SurveyResponse,
} from 'services/surveyInterfaces';

export interface SurveyAnswerProps {
  question: SurveyQuestionInterface;
  currentResponse: SurveyResponse | null;
  setResponse: Dispatch<SetStateAction<SurveyResponse | null>>;
}

const UnsupportedNotice = () => (
  <h2 className="text-2xl mb-2 text-white">
    Somethings went wrong. Please contact support.
  </h2>
);

const AnswerItems: Record<
  QuestionType,
  React.FunctionComponent<SurveyAnswerProps>
> = {
  choice: ChoiceAnswer,
  nps: NpsAnswer,
  rating: RatingAnswer,
  textarea: TextareaAnswer,
  textfield: TextfieldAnswer,
};

const SurveyAnswer = (props: SurveyAnswerProps) => {
  const displayType = props.question.displayType as QuestionType;
  const isValidQuestionType =
    Object.values<string>(QuestionType).includes(displayType);

  if (!isValidQuestionType) {
    return <UnsupportedNotice />;
  }

  const AnswerItem = AnswerItems[displayType];

  return <AnswerItem {...props} />;
};

export default SurveyAnswer;
