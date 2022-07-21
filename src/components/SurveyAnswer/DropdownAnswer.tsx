import { useState } from 'react';

import { SurveyAnswerProps } from '.';
import Select, { SelectOptionType } from 'components/Select';

const DropdownAnswer = ({ question, onResponseChange }: SurveyAnswerProps) => {
  const options = question.answers.map((answer) => ({
    value: answer.id,
    label: answer.text,
  }));

  const onAnswerSelect = (selectedAnswer: SelectOptionType | null) => {
    setCurrentAnswer(selectedAnswer);

    if (selectedAnswer === null) {
      onResponseChange(null);

      return;
    }

    onResponseChange({
      questionId: question.id,
      answers: [{ id: selectedAnswer.value }],
    });
  };

  const [currentAnswer, setCurrentAnswer] = useState<SelectOptionType | null>(
    null
  );

  return (
    <Select
      options={options}
      value={currentAnswer}
      blurInputOnSelect={true}
      // 'swiper-no-swiping` class is required to disable swipe interaction
      // with Swiper of the question list and allow users to click on the select element.
      className="dropdown-answer swiper-no-swiping"
      onChange={onAnswerSelect}
    />
  );
};

export default DropdownAnswer;
