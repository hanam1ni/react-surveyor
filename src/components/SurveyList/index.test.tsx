import { render } from '@testing-library/react';

import SurveyItem from './SurveyItem';
import { Survey } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyItem', () => {
  it('renders survey item', () => {
    const survey = build('survey') as Survey;

    const { getByAltText, getByText } = render(<SurveyItem survey={survey} />);

    expect(getByAltText(survey.title)).toBeInTheDocument();
    expect(getByText(survey.title)).toBeInTheDocument();
    expect(getByText(survey.description)).toBeInTheDocument();
  });
});
