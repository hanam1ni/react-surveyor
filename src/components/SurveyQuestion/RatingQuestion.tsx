import { useState } from 'react';

import { SurveyQuestionProps } from './';
import RatingItem from './RatingItem';

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

const RatingQuestion = ({
  question,
  currentResponse,
  setResponse,
}: SurveyQuestionProps) => {
  const setDefaultSelectedIndex = () => {
    if (currentResponse === null) {
      return -1;
    }

    const [currentAnswer] = currentResponse.answers;
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
          <RatingItem
            key={index}
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
