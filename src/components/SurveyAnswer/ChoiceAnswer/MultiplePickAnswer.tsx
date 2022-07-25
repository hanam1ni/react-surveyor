import Image from 'next/image';
import SimpleBar from 'simplebar-react';

import { SurveyAnswerProps } from '..';

import styles from './ChoiceAnswer.module.scss';
import 'simplebar-react/dist/simplebar.min.css';

const MultiplePickAnswer = ({
  question,
  currentResponse,
  onResponseChange,
}: SurveyAnswerProps) => {
  const onAnswerSelect = (answerId: string) => {
    const currentAnswers = currentResponse?.answers || [];
    const isAnswerSelected = currentAnswers.some(({ id }) => id === answerId);

    if (isAnswerSelected) {
      const updatedAnswers = currentAnswers.filter(({ id }) => id !== answerId);

      if (updatedAnswers.length === 0) {
        return onResponseChange(null);
      }

      onResponseChange({
        questionId: question.id,
        answers: updatedAnswers,
      });
    } else {
      onResponseChange({
        questionId: question.id,
        answers: currentAnswers.concat({ id: answerId }),
      });
    }
  };

  const answerStateClass = (answerId: string) => {
    const isActiveAnswer = currentResponse?.answers.some(
      ({ id }) => id === answerId
    );

    if (isActiveAnswer) {
      return styles.activeAnswer;
    }
  };

  return (
    <SimpleBar className="max-h-60 pr-4" autoHide={false}>
      {question.answers.map((answer) => (
        <div
          key={answer.id}
          className={`${styles.multiplePickAnswer} ${answerStateClass(
            answer.id
          )}`}
          onClick={() => onAnswerSelect(answer.id)}
        >
          {answer.text}
          <div className={styles.checkbox}>
            <div className={styles.checkboxIcon}>
              <Image
                width={13}
                height={13}
                src="/icon/check.svg"
                alt="active answer icon"
              />
            </div>
          </div>
        </div>
      ))}
    </SimpleBar>
  );
};

export default MultiplePickAnswer;
