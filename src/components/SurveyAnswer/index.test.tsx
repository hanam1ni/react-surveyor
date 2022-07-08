import { fireEvent, render, waitFor } from '@testing-library/react';

import SurveyAnswer from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyAnswer', () => {
  describe('given choice display type', () => {
    const ACTIVE_ANSWER_TEXT_COLOR = 'text-white';
    const INACTIVE_ANSWER_TEXT_COLOR = 'text-gray-400';

    it('renders the answers', async () => {
      const answers = [
        build('surveyAnswer', { text: 'First Question' }),
        build('surveyAnswer', { text: 'Second Question' }),
      ];
      const question = build('surveyQuestion', {
        displayType: 'choice',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <SurveyAnswer
          question={question}
          currentResponse={null}
          setResponse={jest.fn()}
        />
      );

      expect(getByText(/First Question/)).toHaveClass(
        INACTIVE_ANSWER_TEXT_COLOR
      );
      expect(getByText(/Second Question/)).toHaveClass(
        INACTIVE_ANSWER_TEXT_COLOR
      );
    });

    describe('click on answer', () => {
      it('sets survey response', async () => {
        const answer = build('surveyAnswer', { text: 'First Question' });
        const otherAnswers = [
          build('surveyAnswer', { text: 'Second Question' }),
          build('surveyAnswer', { text: 'Third Question' }),
        ];
        const question = build('surveyQuestion', {
          displayType: 'choice',
          answers: [answer, ...otherAnswers],
        }) as SurveyQuestionInterface;
        const setResponse = jest.fn();

        const { getByText } = render(
          <SurveyAnswer
            question={question}
            currentResponse={null}
            setResponse={setResponse}
          />
        );

        fireEvent.click(getByText(/First Question/));

        expect(setResponse).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer.id }],
        });
        waitFor(() =>
          expect(getByText(/First Question/)).toHaveClass(
            ACTIVE_ANSWER_TEXT_COLOR
          )
        );
        expect(getByText(/Second Question/)).toHaveClass(
          INACTIVE_ANSWER_TEXT_COLOR
        );
        expect(getByText(/Third Question/)).toHaveClass(
          INACTIVE_ANSWER_TEXT_COLOR
        );
      });
    });
  });

  describe('given rating display type', () => {
    it('renders the answers', async () => {
      const answers = [build('surveyAnswer'), build('surveyAnswer')];
      const question = build('surveyQuestion', {
        displayType: 'rating',
        ratingType: 'star',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getAllByAltText } = render(
        <SurveyAnswer
          question={question}
          currentResponse={null}
          setResponse={jest.fn()}
        />
      );

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
          <SurveyAnswer
            question={question}
            currentResponse={null}
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
        <SurveyAnswer
          question={question}
          currentResponse={null}
          setResponse={jest.fn()}
        />
      );

      expect(
        getByText(/Somethings went wrong. Please contact support./)
      ).toBeInTheDocument();
    });
  });
});
