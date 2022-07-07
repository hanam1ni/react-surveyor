import { SurveyAnswerProps } from '.';

import styles from './SurveyAnswer.module.css';

const NpsAnswer = ({
  question,
  currentResponse,
  setResponse,
}: SurveyAnswerProps) => {
  const onAnswerSelect = (answerId: string) => {
    setResponse({ questionId: question.id, answers: [{ id: answerId }] });
  };

  const answerClass = (answerId: string) => {
    const isActiveAnswer = currentResponse?.answers[0].id === answerId;

    if (isActiveAnswer) {
      return 'bg-white text-gray-700';
    }

    return 'text-white';
  };

  return (
    <div className="self-center">
      <div>
        {question.answers.map((answer, index) => (
          <div
            key={index}
            className={`${styles.npsAnswer} ${answerClass(answer.id)}`}
            onClick={() => onAnswerSelect(answer.id)}
          >
            {answer.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <span className="text-lg text-gray-400 font-semibold">
          Not at all Likely
        </span>
        <span className="text-lg text-white font-semibold">
          Extremely Likely
        </span>
      </div>
    </div>
  );
};

export default NpsAnswer;
