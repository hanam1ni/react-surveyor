import Image from 'next/image';
import { useState } from 'react';

import { SurveyQuestionProps } from './';

interface RatingItemProps {
  index: number;
  ratingType?: string;
  answerClass: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const answerClass = (
  answerIndex: number,
  selectedIndex: number,
  hoverIndex: number
) => {
  const isActiveAnswer = answerIndex <= Math.max(selectedIndex, hoverIndex);

  if (isActiveAnswer) {
    return 'opacity-100';
  }

  return 'opacity-50';
};

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

const RaingItem = ({
  index,
  ratingType = 'star',
  answerClass,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RatingItemProps) => (
  <div
    key={index}
    className={`inline-block px-1 cursor-pointer ${answerClass}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Image
      width={34}
      height={34}
      src={answerIcon(ratingType)}
      alt={`${ratingType} icon`}
    />
  </div>
);

const RatingQuestion = ({
  question,
  currentResponses,
  setResponse,
}: SurveyQuestionProps) => {
  const setDefaultSelectedIndex = () => {
    if (currentResponses === null) {
      return -1;
    }

    const [currentAnswer] = currentResponses.answers;
    const { displayOrder = -1 } =
      question.answers.find(({ id }) => id === currentAnswer.id) || {};

    return displayOrder;
  };

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(setDefaultSelectedIndex());

  const onAnswerSelect = (answerId: string, index: number) => {
    setSelectedIndex(index);
    setResponse({ questionId: question.id, answers: [{ id: answerId }] });
  };

  return (
    <div className="flex flex-col">
      <h1 className="mb-11 text-4xl font-extrabold text-white">
        {question.text}
      </h1>
      <div className="self-center">
        {question.answers.map((answer, index) => (
          <RaingItem
            key={index}
            index={index}
            ratingType={question.ratingType}
            answerClass={answerClass(index, selectedIndex, hoverIndex)}
            onClick={() => onAnswerSelect(answer.id, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingQuestion;
