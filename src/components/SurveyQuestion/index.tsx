import SurveyAnswer, { SurveyAnswerProps } from 'components/SurveyAnswer';
import {
  QuestionType,
  SurveyQuestion as SurveyQuestionInterface,
} from 'services/surveyInterfaces';

interface SurveyQuestionProps extends SurveyAnswerProps {
  lastQuestionOrder: number;
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

const SurveyQuestion = ({
  lastQuestionOrder,
  question,
  ...answerProps
}: SurveyQuestionProps) => {
  const isValidQuestionType = Object.values<string>(QuestionType).includes(
    question.displayType
  );

  if (!isValidQuestionType) {
    return <UnsupportedTypeNotice />;
  }

  return (
    <div className="h-screen w-full max-w-3xl mx-auto flex flex-col justify-center">
      <div className="mb-4 text-gray-400">{`${question.displayOrder}/${lastQuestionOrder}`}</div>
      <div className="flex flex-col">
        <h1 className="mb-11 text-4xl font-extrabold text-white">
          {question.text}
        </h1>
        <SurveyAnswer question={question} {...answerProps} />
      </div>
    </div>
  );
};

export default SurveyQuestion;
