import { useState } from 'react';

import { SurveyAnswerProps } from '.';
import RatingItem from './RatingItem';

const answerStateClass = (
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

const RatingAnswer = ({
  question,
  currentResponse,
  setResponse,
}: SurveyAnswerProps) => {
  const setDefaultSelectedIndex = () => {
    if (currentResponse === null) {
      return -1;
    }

    const currentAnswer = currentResponse.answers[0];
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
    <div className="self-center">
      {question.answers.map((answer, index) => (
        <RatingItem
          key={answer.id}
          ratingType={question.ratingType}
          answerStateClass={answerStateClass(index, selectedIndex, hoverIndex)}
          onClick={() => onAnswerSelect(answer.id, index)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        />
      ))}
    </div>
  );
};

export default RatingAnswer;
