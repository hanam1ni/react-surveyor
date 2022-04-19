import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PasswordReset from 'pages/password-reset.page';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');

describe('Password reset page', () => {
  describe('when the user submits the form', () => {
    beforeEach(() => {
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockRejectedValue({ status: 401 });
    });

    describe('when missing required inputs', () => {
      it('renders error messages', () => {
        render(<PasswordReset />);

        fireEvent.click(screen.getByText('Send Recovery Email'));

        expect(screen.getByText("Email can't be blank"));
      });

      it('hides error messages after having filled the required inputs', () => {
        render(<PasswordReset />);

        fireEvent.click(screen.getByText('Send Recovery Email'));

        expect(screen.getByText("Email can't be blank"));

        fireEvent.change(screen.getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });

        expect(screen.queryByText("Email can't be blank")).toBeNull();
      });
    });
  });

  describe('when the user has already authenticated', () => {
    it('redirects user to home page', async () => {
      const { push } = mockUseRouter();

      const user = build('user');
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockResolvedValue(user);

      render(<PasswordReset />);

      await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    });
  });
});
