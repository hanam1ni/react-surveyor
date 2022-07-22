import { render, waitFor } from '@testing-library/react';

import SurveyQuestion from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyQuestion', () => {
  it('renders the given question with order', async () => {
    const question = build('surveyQuestion', {
      displayType: 'rating',
      ratingType: 'star',
      displayOrder: '2',
    }) as SurveyQuestionInterface;

    const { getByText } = render(
      <SurveyQuestion
        lastQuestionOrder={3}
        question={question}
        currentResponse={undefined}
        onResponseChange={jest.fn()}
      />
    );

    await waitFor(() => expect(getByText(question.text)).toBeInTheDocument());
    expect(getByText('2/3')).toBeInTheDocument();
  });

  describe('given unsupported type', () => {
    it('renders unsupported notice', () => {
      const question = build('surveyQuestion', {
        displayType: 'awesomeTextarea',
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <SurveyQuestion
          lastQuestionOrder={10}
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(getByText(/Not supported survey question./)).toBeInTheDocument();
      expect(
        getByText(/Don't hesitate to get in touch with support./)
      ).toBeInTheDocument();
    });
  });
});
