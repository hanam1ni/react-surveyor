import SurveyAnswer, { SurveyAnswerProps } from 'components/SurveyAnswer';
import {
  DisplayType as QuestionDisplayType,
  SurveyQuestion as SurveyQuestionInterface,
} from 'services/surveyInterfaces';

interface SurveyQuestionProps extends SurveyAnswerProps {
  question: SurveyQuestionInterface;
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

const SurveyQuestion = ({ question, ...answerProps }: SurveyQuestionProps) => {
  const isValidDisplayType = Object.values(QuestionDisplayType).includes(
    question.displayType
  );

  if (!isValidDisplayType) {
    return <UnsupportedTypeNotice />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-11 text-4xl font-extrabold text-white">
        {question.text}
      </h1>
      <SurveyAnswer question={question} {...answerProps} />
    </div>
  );
};

export default SurveyQuestion;
