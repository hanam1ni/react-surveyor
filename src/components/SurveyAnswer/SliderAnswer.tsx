import { useMemo } from 'react';

import { SurveyAnswerProps } from '.';
import Slider from 'components/Slider';

const SliderAnswer = ({ question, onResponseChange }: SurveyAnswerProps) => {
  const setCurrentResponse = (index: number) => {
    const answerId = question.answers[index].id;

    onResponseChange({ questionId: question.id, answers: [{ id: answerId }] });
  };

  const sliderLabels = useMemo(
    () => question.answers.map(({ text }) => text),
    []
  );

  return (
    <Slider
      // 'swiper-no-swiping` class is required to disable swipe interaction
      // with Swiper of the question list and allow users to click on the select element.
      className="swiper-no-swiping"
      labels={sliderLabels}
      max={question.answers.length - 1}
      onChange={setCurrentResponse}
    />
  );
};

export default SliderAnswer;
