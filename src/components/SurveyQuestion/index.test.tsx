import { render, waitFor } from '@testing-library/react';


import SurveyQuestion from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyQuestion', () => {
  it('renders the given question', async () => {
    const question = build('surveyQuestion', {
      displayType: 'rating',
      ratingType: 'star',
    }) as SurveyQuestionInterface;

    const { getByText } = render(
      <SurveyQuestion
        question={question}
        currentResponse={null}
        setResponse={jest.fn()}
      />
    );

    await waitFor(() => expect(getByText(question.text)).toBeInTheDocument());
  });

  describe('given unsupported type', () => {
    it('renders unsupported notice', () => {
      const question = build('surveyQuestion', {
        displayType: 'awesomeTextarea',
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <SurveyQuestion
          question={question}
          currentResponse={null}
          setResponse={jest.fn()}
        />
      );

      expect(getByText(/Not supported survey question./)).toBeInTheDocument();
      expect(
        getByText(/Don't hesitate to get in touch with support./)
      ).toBeInTheDocument();
    });
  });
});
