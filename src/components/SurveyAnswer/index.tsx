import { Dispatch, SetStateAction } from 'react';

import ChoiceAnswer from './ChoiceAnswer';
import NpsAnswer from './NpsAnswer';
import RatingAnswer from './RatingAnswer';
import TextareaAnswer from './TextareaAnswer';
import {
  SurveyQuestion as SurveyQuestionInterface,
  SurveyResponse,
} from 'services/surveyInterfaces';

export interface SurveyAnswerProps {
  question: SurveyQuestionInterface;
  currentResponse: SurveyResponse | null;
  setResponse: Dispatch<SetStateAction<SurveyResponse | null>>;
}

const SurveyAnswer = (props: SurveyAnswerProps) => {
  switch (props.question.displayType) {
    case 'choice':
      return <ChoiceAnswer {...props} />;
    case 'nps':
      return <NpsAnswer {...props} />;
    case 'rating':
      return <RatingAnswer {...props} />;
    case 'textarea':
      return <TextareaAnswer {...props} />;
    default:
      return (
        <h2 className="text-2xl mb-2 text-white">
          Somethings went wrong. Please contact support.
        </h2>
      );
  }
};

export default SurveyAnswer;
