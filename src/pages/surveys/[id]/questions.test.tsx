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

  describe('when submitting survey responses', () => {
    describe('given invalid survey responses', () => {
      it('renders an error message', async () => {
        const question1 = build('surveyQuestion', {
          displayType: 'textarea',
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

        mockUseRouter({ query: { id: surveyDetail.id } });

        const { container, getByText } = renderPage(<SurveyQuestion />, {
          initialStore: {
            currentSurvey: surveyDetail,
          },
        });

        const textarea = container.querySelector('textarea');
        fireEvent.change(textarea!, { target: { value: 'Awesome response' } });
        fireEvent.click(getByText('Submit'));

        await waitFor(() =>
          expect(
            getByText("Answer for question(s) 2 can't be blank")
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
          query: { id: surveyDetail.id },
        });

        const { container, getByText } = renderPage(<SurveyQuestion />, {
          initialStore: {
            currentSurvey: surveyDetail,
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

  describe('when leaving survey questions page', () => {
    it('redirects user to survey detail page', async () => {
      const surveyDetail = build('surveyDetail');
      const { push } = mockUseRouter({ query: { id: surveyDetail.id } });

      const { getByText, getByTestId } = renderPage(<SurveyQuestion />, {
        initialStore: {
          currentSurvey: surveyDetail,
        },
      });

      fireEvent.click(getByTestId('leave-button'));
      fireEvent.click(getByText('Yes'));

      await waitFor(() =>
        expect(push).toHaveBeenCalledWith(`/surveys/${surveyDetail.id}`)
      );
    });
  });
});
