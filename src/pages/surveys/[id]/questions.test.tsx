import { fireEvent, waitFor } from '@testing-library/react';

import SurveyQuestion from './questions.page';
import * as SurveyService from 'services/survey';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';
import { renderPage } from '@support/pageRenderer';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');

describe('Survey Question', () => {
  beforeEach(() => {
    const user = build('user');
    const mockedGetUserProfile = getUserProfile as jest.Mock;
    mockedGetUserProfile.mockResolvedValue(user);
  });

  it('renders question order', async () => {
    const question1 = build('surveyQuestion', { displayOrder: 1 });
    const question2 = build('surveyQuestion', { displayOrder: 2 });
    const question3 = build('surveyQuestion', { displayOrder: 3 });
    const surveyDetail = build('surveyDetail', {
      questions: [question1, question2, question3],
    });

    mockUseRouter({ query: { currentOrder: '2', id: surveyDetail.id } });

    const { getByText } = renderPage(<SurveyQuestion />, {
      initialStore: { currentSurvey: surveyDetail },
    });

    await waitFor(() => expect(getByText('2/3')).toBeInTheDocument());
  });

  describe('given question order is not the last one', () => {
    it('renders next question button', async () => {
      const question1 = build('surveyQuestion', { displayOrder: 1 });
      const question2 = build('surveyQuestion', { displayOrder: 2 });
      const surveyDetail = build('surveyDetail', {
        questions: [question1, question2],
      });

      mockUseRouter({ query: { currentOrder: '1', id: surveyDetail.id } });

      const { getByTestId } = renderPage(<SurveyQuestion />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      await waitFor(() =>
        expect(getByTestId('next-question-button')).toBeInTheDocument()
      );
    });
  });

  describe('given the last question', () => {
    it('renders submit button', async () => {
      const question1 = build('surveyQuestion', { displayOrder: 1 });
      const question2 = build('surveyQuestion', { displayOrder: 2 });
      const surveyDetail = build('surveyDetail', {
        questions: [question1, question2],
      });

      mockUseRouter({ query: { currentOrder: '2', id: surveyDetail.id } });

      const { getByText } = renderPage(<SurveyQuestion />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      await waitFor(() => expect(getByText('Submit')).toBeInTheDocument());
    });
  });

  describe('given invalid question order', () => {
    it('redirects user to survey intro', async () => {
      const surveyDetail = build('surveyDetail');
      const { push } = mockUseRouter({
        query: { currentOrder: '100', id: surveyDetail.id },
      });

      renderPage(<SurveyQuestion />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      await waitFor(() =>
        expect(push).toHaveBeenCalledWith(`/surveys/${surveyDetail.id}`)
      );
    });
  });

  describe('when submitting survey responses', () => {
    describe('given invalid survey responses', () => {
      it('renders an error message', async () => {
        const question1 = build('surveyQuestion', {
          displayOrder: 1,
          isMandatory: true,
        });
        const question2 = build('surveyQuestion', {
          displayType: 'nps',
          displayOrder: 2,
          isMandatory: true,
        });
        const surveyDetail = build('surveyDetail', {
          questions: [question1, question2],
        });

        mockUseRouter({ query: { currentOrder: '2', id: surveyDetail.id } });

        const surveyResponses = [
          {
            questionId: question2.id,
            answers: [
              {
                id: question2.answers[0].id,
              },
            ],
          },
        ];

        const { getByText } = renderPage(<SurveyQuestion />, {
          initialStore: {
            currentSurvey: surveyDetail,
            surveyResponses,
          },
        });

        fireEvent.click(getByText('Submit'));

        await waitFor(() =>
          expect(
            getByText("Answer for question(s) 1 can't be blank")
          ).toBeInTheDocument()
        );
      });
    });

    describe('given valid survey responses', () => {
      it('redirects user to outro page', async () => {
        const mockedSubmitSurveyResponse = jest.spyOn(
          SurveyService,
          'submitSurveyResponse'
        );
        mockedSubmitSurveyResponse.mockResolvedValue({});

        const question = build('surveyQuestion', {
          displayType: 'textarea',
          displayOrder: 1,
          isMandatory: true,
        });

        const surveyDetail = build('surveyDetail', {
          questions: [question],
        });

        const { push } = mockUseRouter({
          query: { currentOrder: '1', id: surveyDetail.id },
        });

        const { container, getByText } = renderPage(<SurveyQuestion />, {
          initialStore: {
            currentSurvey: surveyDetail,
            surveyResponses: [],
          },
        });

        const textarea = container.querySelector('textarea');
        fireEvent.change(textarea!, { target: { value: 'Awesome response' } });
        fireEvent.click(getByText('Submit'));

        const submittedSurveyResponses = [
          {
            questionId: question.id,
            answers: [
              { answer: 'Awesome response', id: question.answers[0].id },
            ],
          },
        ];

        await waitFor(() =>
          expect(push).toHaveBeenCalledWith(`/surveys/${surveyDetail.id}/outro`)
        );
        expect(mockedSubmitSurveyResponse).toHaveBeenCalledWith(
          surveyDetail.id,
          submittedSurveyResponses
        );
      });
    });
  });
});
