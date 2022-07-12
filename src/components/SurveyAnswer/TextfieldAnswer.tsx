import React from 'react';

import { SurveyAnswerProps } from '.';

const TextfieldAnswer = ({
  question,
  currentResponse,
  setResponse,
}: SurveyAnswerProps) => {
  const setAnswerValue = (answerId: string) => {
    const answerValue = currentResponse?.answers.find(
      (answer) => answer.id === answerId
    )?.answer;

    return answerValue || '';
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    answerId: string
  ) => {
    const currentResponseAnswers = currentResponse?.answers || [];
    const updatedResponseAnswers = currentResponseAnswers
      .filter((answer) => answer.id !== answerId)
      .concat({ id: answerId, answer: event.target.value });

    setResponse({
      questionId: question.id,
      answers: updatedResponseAnswers,
    });
  };

  return (
    <div>
      {question.answers.map((answer, index) => (
        <div key={index} className="pl-2 pr-8 mb-4">
          <h2 className="mb-2 text-gray-400">{answer.text}</h2>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-300 bg-opacity-30 backdrop-blur-3xl text-white text-lg"
            value={setAnswerValue(answer.id)}
            onChange={(event) => handleAnswerChange(event, answer.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TextfieldAnswer;
