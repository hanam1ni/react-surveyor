import { waitFor } from '@testing-library/react';

import SurveyOutro from './outro.page';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';
import { renderPage } from '@support/pageRenderer';
import { mockUseRouter } from '@support/useRouter';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

jest.mock('services/user');

describe('Survey Outro', () => {
  beforeEach(() => {
    const user = build('user');
    const mockedGetUserProfile = getUserProfile as jest.Mock;
    mockedGetUserProfile.mockResolvedValue(user);
  });

  describe('when reaching redirect timeout', () => {
    it('redirects user to home page', async () => {
      const { push } = mockUseRouter();
      const surveyDetail = build('surveyDetail');

      renderPage(<SurveyOutro />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      jest.runAllTimers();

      await waitFor(() => expect(push).toBeCalledWith('/'));
    });
  });

  describe('given survey has outro', () => {
    it('renders survey outro message', async () => {
      const surveyDetail = build('surveyDetail');

      const { getByText } = renderPage(<SurveyOutro />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      await waitFor(() =>
        expect(getByText(surveyDetail.outro.text)).toBeInTheDocument()
      );
    });
  });

  describe('given survey does not have outro', () => {
    it('renders default outro message', async () => {
      const surveyDetail = build('surveyDetail', { outro: undefined });

      const { getByText } = renderPage(<SurveyOutro />, {
        initialStore: { currentSurvey: surveyDetail },
      });

      await waitFor(() =>
        expect(getByText('Thanks for taking the survey.')).toBeInTheDocument()
      );
    });
  });
});
