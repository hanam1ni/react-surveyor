import React from 'react';

import { SurveyAnswerProps } from '..';
import MultiplePickAnswer from './MultiplePickAnswer';
import SinglePickAnswer from './SinglePickAnswer';
import { PickType } from 'services/surveyInterfaces';

const AnswerItems: Record<
  PickType,
  React.FunctionComponent<SurveyAnswerProps>
> = {
  one: SinglePickAnswer,
  any: MultiplePickAnswer,
};

const ChoiceAnswer = (props: SurveyAnswerProps) => {
  const AnswerItem = AnswerItems[props.question.pick];

  return <AnswerItem {...props} />;
};

export default ChoiceAnswer;
