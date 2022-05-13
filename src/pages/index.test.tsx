import { screen, waitFor } from '@testing-library/react';

import Home from 'pages/index.page';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';
import { renderPage } from '@support/pageRenderer';

jest.mock('services/user');

describe('Home', () => {
  it('renders the current date', async () => {
    const user = build('user');
    const mockedGetUserProfile = getUserProfile as jest.Mock;
    mockedGetUserProfile.mockResolvedValue(user);

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 0, 1));

    renderPage(<Home />);

    await waitFor(() => expect(screen.getByText('Saturday, January 1')));
  });
});
