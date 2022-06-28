import { screen, waitFor } from '@testing-library/react';

import SurveyDetail from './[id].page';
import { getSurveyDetail } from 'services/survey';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';
import { renderPage } from '@support/pageRenderer';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');
jest.mock('services/survey');

describe('Survey Detail', () => {
  beforeEach(() => {
    const user = build('user');
    const mockedGetUserProfile = getUserProfile as jest.Mock;
    mockedGetUserProfile.mockResolvedValue(user);
  });

  it('renders survey intro', async () => {
    mockUseRouter({ query: { id: '10' } });

    const surveyDetail = build('surveyDetail');
    const mockedGetSurveyDetail = getSurveyDetail as jest.Mock;
    mockedGetSurveyDetail.mockResolvedValue(surveyDetail);

    renderPage(<SurveyDetail />);

    await waitFor(() =>
      expect(screen.getByText(surveyDetail.title)).toBeInTheDocument()
    );

    expect(screen.getByText(surveyDetail.intro.text)).toBeInTheDocument();
    expect(screen.getByAltText(surveyDetail.intro.text)).toBeInTheDocument();
  });
});
