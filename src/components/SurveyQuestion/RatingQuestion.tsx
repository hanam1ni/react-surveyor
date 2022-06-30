import Image from 'next/image';
import { useState } from 'react';

import { SurveyQuestionProps } from './';

import styles from './SurveyQuestion.module.css';

const answerIcon = (ratingType?: string) => {
  switch (ratingType) {
    case 'smiley':
      return '/icon/smiley.svg';
    case 'star':
      return '/icon/star.svg';
    case 'heart':
      return '/icon/heart.svg';
    default:
      return '/icon/star.svg';
  }
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
  currentResponses,
  setResponses,
}: SurveyQuestionProps) => {
  const setDefaultSelectedIndex = () => {
    if (currentResponses === null) {
      return -1;
    }

    const [currentAnswer] = currentResponses.answers;
    const surveyAnswer = question.answers.find(
      ({ id }) => id === currentAnswer.id
    );

    return surveyAnswer?.displayOrder || -1;
  };

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(setDefaultSelectedIndex());

  const onAnswerClick = (answerId: string, index: number) => {
    setSelectedIndex(index);
    setResponses({ questionId: question.id, answers: [{ id: answerId }] });
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
                src={answerIcon(question.ratingType)}
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
