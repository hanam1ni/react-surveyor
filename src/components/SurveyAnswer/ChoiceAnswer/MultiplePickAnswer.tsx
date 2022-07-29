import SimpleBar from 'simplebar-react';

import { SurveyAnswerProps } from '..';
import MultiplePickAnswerItem from './MultiplePickAnswerItem';
import { SurveyResponse } from 'services/surveyInterfaces';

import 'simplebar-react/dist/simplebar.min.css';

const MultiplePickAnswer = ({
  question,
  currentResponse,
  onResponseChange,
}: SurveyAnswerProps) => {
  const setCurrentResponses = (updatedAnswers: SurveyResponse['answers']) => {
    if (updatedAnswers.length === 0) {
      return onResponseChange(null);
    }

    onResponseChange({
      questionId: question.id,
      answers: updatedAnswers,
    });
  };

  const onAnswerItemSelect = (answerId: string) => {
    const selectedAnswers = currentResponse?.answers || [];
    const isAnswerSelected = selectedAnswers.some(({ id }) => id === answerId);

    if (isAnswerSelected) {
      const updatedAnswers = selectedAnswers.filter(
        ({ id }) => id !== answerId
      );

      setCurrentResponses(updatedAnswers);
    } else {
      setCurrentResponses(selectedAnswers.concat({ id: answerId }));
    }
  };

  return (
    <SimpleBar className="max-h-60 pr-4" autoHide={false}>
      {question.answers.map((answer) => (
        <MultiplePickAnswerItem
          key={answer.id}
          answer={answer}
          onAnswerItemSelect={onAnswerItemSelect}
        />
      ))}
    </SimpleBar>
  );
};

export default MultiplePickAnswer;
