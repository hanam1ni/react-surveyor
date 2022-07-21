import React from 'react';

import { SurveyAnswerProps } from '.';

const TextfieldAnswer = ({
  question,
  currentResponse,
  onResponseChange,
}: SurveyAnswerProps) => {
  const answerValue = (answerId: string) => {
    const currentValue = currentResponse?.answers.find(
      (answer) => answer.id === answerId
    )?.answer;

    return currentValue || '';
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    answerId: string
  ) => {
    const currentResponseAnswers = currentResponse?.answers || [];
    const updatedResponseAnswers = currentResponseAnswers
      .filter((answer) => answer.id !== answerId)
      .concat({ id: answerId, answer: event.target.value });

    onResponseChange({
      questionId: question.id,
      answers: updatedResponseAnswers,
    });
  };

  return (
    <div>
      {question.answers.map((answer) => (
        <div key={answer.id} className="pl-2 pr-8 mb-4">
          <h2 className="mb-2 text-gray-400">{answer.text}</h2>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-300 bg-opacity-30 backdrop-blur-3xl text-white text-lg"
            value={answerValue(answer.id)}
            onChange={(event) => handleAnswerChange(event, answer.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TextfieldAnswer;
