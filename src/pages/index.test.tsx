import { render, screen, waitFor } from '@testing-library/react';

import Home from 'pages/index.page';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';

jest.mock('services/user');

describe('Home', () => {
  it('renders a heading', async () => {
    const user = build('user');
    const mockedGetUserProfile = getUserProfile as jest.Mock;
    mockedGetUserProfile.mockResolvedValue(user);

    render(<Home />);

    const heading = await waitFor(() =>
      screen.getByRole('heading', {
        name: /Coming soon. Stay tune for more content 😎/,
      })
    );

    expect(heading).toBeInTheDocument();
  });
});
