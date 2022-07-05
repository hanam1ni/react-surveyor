import { waitFor } from '@testing-library/react';

import SurveyQuestion from './[currentOrder].page';
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

    mockUseRouter({ query: { order: '2', id: surveyDetail.id } });

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

      mockUseRouter({ query: { order: '1', id: surveyDetail.id } });

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

      mockUseRouter({ query: { order: '2', id: surveyDetail.id } });

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
        query: { order: '100', id: surveyDetail.id },
      });

      renderPage(<SurveyQuestion />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      await waitFor(() =>
        expect(push).toHaveBeenCalledWith(`/surveys/${surveyDetail.id}`)
      );
    });
  });
});
