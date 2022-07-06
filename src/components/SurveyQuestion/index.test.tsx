import { render } from '@testing-library/react';

import SurveyQuestion from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyQuestion', () => {
  describe('given unsupported type', () => {
    it('renders unsupported notice', () => {
      const question = build('surveyQuestion', {
        displayType: 'awesomeTextarea',
      }) as SurveyQuestionInterface;

      const { getByText } = render(<SurveyQuestion question={question} />);

      expect(getByText(/Not supported survey question./)).toBeInTheDocument();
      expect(
        getByText(/Don't hesitate to get in touch with support./)
      ).toBeInTheDocument();
    });
  });
});
