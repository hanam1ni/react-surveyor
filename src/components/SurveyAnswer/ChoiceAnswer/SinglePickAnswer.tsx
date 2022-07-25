import SimpleBar from 'simplebar-react';

import { SurveyAnswerProps } from '..';

import 'simplebar-react/dist/simplebar.min.css';

const SinglePickAnswer = ({
  question,
  currentResponse,
  onResponseChange,
}: SurveyAnswerProps) => {
  const onAnswerSelect = (answerId: string) => {
    onResponseChange({ questionId: question.id, answers: [{ id: answerId }] });
  };

  const answerStateClass = (answerId: string) => {
    const isActiveAnswer = currentResponse?.answers[0].id === answerId;

    if (isActiveAnswer) {
      return 'border-y border-gray-300 text-white font-bold';
    }

    return 'text-gray-400';
  };

  return (
    <SimpleBar className="max-h-60 pr-4" autoHide={false}>
      {question.answers.map((answer) => (
        <div
          key={answer.id}
          className={`py-4 text-center cursor-pointer hover:text-white hover:font-semibold ${answerStateClass(
            answer.id
          )}`}
          onClick={() => onAnswerSelect(answer.id)}
        >
          {answer.text}
        </div>
      ))}
    </SimpleBar>
  );
};

export default SinglePickAnswer;
