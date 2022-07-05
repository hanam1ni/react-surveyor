import { Dispatch, SetStateAction } from 'react';

import RatingQuestion from './RatingQuestion';
import {
  SurveyQuestion as SurveyQuestionInterface,
  SurveyResponse,
} from 'services/surveyInterfaces';

export interface SurveyQuestionProps {
  question: SurveyQuestionInterface;
  currentResponses: SurveyResponse | null;
  setResponse: Dispatch<SetStateAction<SurveyResponse | null>>;
}

const UnsupportedTypeNotice = () => (
  <div>
    <h1 className="text-3xl mb-2 text-white">
      🚧 Not supported survey question.
    </h1>
    <h2 className="text-2xl mb-2 text-gray-400">
      Don&#39;t hesitate to get in touch with support.
    </h2>
  </div>
);

const SurveyQuestion = ({
  question,
  currentResponses,
  setResponse,
}: SurveyQuestionProps) => {
  switch (question.displayType) {
    case 'rating':
      return (
        <RatingQuestion
          question={question}
          currentResponses={currentResponses}
          setResponse={setResponse}
        />
      );
    default:
      return <UnsupportedTypeNotice />;
  }
};

export default SurveyQuestion;
