import { fireEvent, render, waitFor } from '@testing-library/react';

import SurveyQuestion from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyQuestion', () => {
  describe('given rating question type', () => {
    it('renders the given question', async () => {
      const answers = [build('surveyAnswer'), build('surveyAnswer')];
      const question = build('surveyQuestion', {
        displayType: 'rating',
        ratingType: 'star',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getAllByAltText, getByText } = render(
        <SurveyQuestion
          question={question}
          currentResponses={null}
          setResponse={jest.fn()}
        />
      );

      await waitFor(() => expect(getByText(question.text)).toBeInTheDocument());
      expect(getAllByAltText('star icon').length).toEqual(2);
    });

    describe('click on answer', () => {
      it('sets survey response', async () => {
        const answer = build('surveyAnswer');
        const otherAnswers = [build('surveyAnswer'), build('surveyAnswer')];
        const question = build('surveyQuestion', {
          displayType: 'rating',
          ratingType: 'star',
          answers: [answer, ...otherAnswers],
        }) as SurveyQuestionInterface;
        const setResponse = jest.fn();

        const { getAllByAltText } = render(
          <SurveyQuestion
            question={question}
            currentResponses={null}
            setResponse={setResponse}
          />
        );

        fireEvent.click(getAllByAltText('star icon')[0]);

        expect(setResponse).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer.id }],
        });
      });
    });
  });

  describe('given unsupported type', () => {
    it('renders unsupported notice', () => {
      const question = build('surveyQuestion', {
        displayType: 'awesomeTextarea',
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <SurveyQuestion
          question={question}
          currentResponses={null}
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
