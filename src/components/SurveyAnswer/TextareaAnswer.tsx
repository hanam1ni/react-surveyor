import React from 'react';

import { SurveyAnswerProps } from '.';

const TextareaAnswer = ({
  question,
  currentResponse,
  setResponse,
}: SurveyAnswerProps) => {
  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value === '') {
      return setResponse(null);
    }

    const currentAnswer = question.answers[0];

    setResponse({
      questionId: question.id,
      answers: [{ id: currentAnswer.id, answer: event.target.value }],
    });
  };

  return (
    <textarea
      className="min-h-[110px] p-4 rounded-lg bg-gray-300 bg-opacity-30 backdrop-blur-3xl text-white text-lg"
      value={currentResponse?.answers[0].answer}
      onChange={handleAnswerChange}
    />
  );
};

export default TextareaAnswer;
