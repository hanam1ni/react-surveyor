import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

interface SurveyQuestionProps {
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

const SurveyQuestion = ({ question }: SurveyQuestionProps) => {
  switch (question.displayType) {
    default:
      return <UnsupportedTypeNotice />;
  }
};

export default SurveyQuestion;
