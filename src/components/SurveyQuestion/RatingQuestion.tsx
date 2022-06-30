import Image from 'next/image';
import { useState } from 'react';

import { SurveyQuestion } from 'services/surveyInterfaces';

import styles from './SurveyQuestion.module.css';

interface RatingQuestionProps {
  question: SurveyQuestion;
  currentAnswers: any;
  setAnswers: any;
}

const ANSWER_ICONS = {
  smiley: '/icon/smiley.svg',
  star: '/icon/star.svg',
  heart: '/icon/heart.svg',
};

const stateClass = (
  answerIndex: number,
  selectedIndex: number,
  hoverIndex: number
) => {
  if (answerIndex <= Math.max(selectedIndex, hoverIndex)) {
    return styles.activeAnswer;
  }

  return styles.inactiveAnswer;
};

const RatingQuestion = ({
  question,
  currentAnswers,
  setAnswers,
}: RatingQuestionProps) => {
  const setDefaultSelectedIndex = () => {
    if (currentAnswers === null) {
      return -1;
    }

    const [currentAnswer] = currentAnswers;
    const { displayOrder } = question.answers.find(
      ({ id }) => id == currentAnswer.id
    );

    return displayOrder;
  };

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(setDefaultSelectedIndex());

  const onAnswerClick = (answerId: string, index: number) => {
    setSelectedIndex(index);
    setAnswers([{ id: answerId }]);
  };

  return (
    <div className={`flex flex-col ${styles.ratingQuestion}`}>
      <h1 className="mb-11 text-4xl font-extrabold text-white">
        {question.text}
      </h1>
      <div className="self-center">
        {question.answers.map((answer, index) => {
          return (
            <div
              key={index}
              className={`inline-block px-1 cursor-pointer ${stateClass(
                index,
                selectedIndex,
                hoverIndex
              )}`}
              onClick={() => onAnswerClick(answer.id, index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
            >
              <Image
                width={34}
                height={34}
                src={ANSWER_ICONS[question.ratingType]}
                alt="smiley icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingQuestion;
