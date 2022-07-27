import { useState } from 'react';
import Image from 'next/image';

import { SurveyAnswer } from 'services/surveyInterfaces';

import styles from './ChoiceAnswer.module.scss';

interface MultiplePickAnswerItemProps {
  answer: SurveyAnswer;
  onAnswerItemSelect: (answerId: string) => void;
}

const MultiplePickAnswerItem = ({
  answer,
  onAnswerItemSelect,
}: MultiplePickAnswerItemProps) => {
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(false);

  const answerStateClass = () => {
    if (isSelectedAnswer) {
      return styles.activeAnswer;
    }
  };

  const onAnswerItemClick = () => {
    setIsSelectedAnswer(!isSelectedAnswer);
    onAnswerItemSelect(answer.id);
  };

  return (
    <div
      className={`${styles.multiplePickAnswer} ${answerStateClass()}`}
      onClick={onAnswerItemClick}
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
  );
};

export default MultiplePickAnswerItem;
