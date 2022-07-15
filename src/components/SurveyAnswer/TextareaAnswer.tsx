import React from 'react';

import { SurveyAnswerProps } from '.';

const TextareaAnswer = ({
  question,
  currentResponse,
  onResponseChange,
}: SurveyAnswerProps) => {
  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const currentAnswer = question.answers[0];

    onResponseChange({
      questionId: question.id,
      answers: [{ id: currentAnswer.id, answer: event.target.value }],
    });
  };

  return (
    <textarea
      className="min-h-[110px] p-4 rounded-lg bg-gray-300 bg-opacity-30 backdrop-blur-3xl text-white text-lg resize-none"
      value={currentResponse?.answers[0].answer}
      onChange={handleAnswerChange}
    />
  );
};

export default TextareaAnswer;
