import { screen, waitFor } from '@testing-library/react';

import Home from 'pages/index.page';
import { listSurveys } from 'services/survey';
import { getUserProfile } from 'services/user';

import { build, buildBatchInfo } from '@support/factory';
import { renderPage } from '@support/pageRenderer';

jest.mock('services/user');
jest.mock('services/survey');

describe('Home', () => {
  beforeEach(() => {
    const user = build('user');
    const mockedGetUserProfile = getUserProfile as jest.Mock;
    mockedGetUserProfile.mockResolvedValue(user);

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 0, 1));
  });

  it('renders the current date', async () => {
    const mockedlistSurveys = listSurveys as jest.Mock;
    mockedlistSurveys.mockResolvedValue({
      surveys: [],
      batchInfo: buildBatchInfo([]),
    });

    renderPage(<Home />);

    await waitFor(() =>
      expect(screen.getByText('Saturday, January 1')).toBeInTheDocument()
    );
  });

  describe('when the surveys list is empty', () => {
    it('renders a placeholder', async () => {
      const mockedlistSurveys = listSurveys as jest.Mock;
      mockedlistSurveys.mockResolvedValue({
        surveys: [],
        batchInfo: buildBatchInfo([]),
      });

      renderPage(<Home />);

      await waitFor(() =>
        expect(
          screen.getByText(/You've completed all the surveys/)
        ).toBeInTheDocument()
      );
    });
  });

  describe('when the surveys list is not empty', () => {
    it('renders the survey item', async () => {
      const survey = build('survey');
      const mockedlistSurveys = listSurveys as jest.Mock;
      mockedlistSurveys.mockResolvedValue({
        surveys: [survey],
        batchInfo: buildBatchInfo([survey]),
      });

      renderPage(<Home />);

      await waitFor(() => {
        expect(screen.getByText(survey.title)).toBeInTheDocument();
        expect(screen.getByText(survey.description)).toBeInTheDocument();
      });
    });
  });
});
