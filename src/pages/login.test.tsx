import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Login from 'pages/login.page';
import { getUserProfile, login } from 'services/user';

import { build } from '@support/factory';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');

describe('Login page', () => {
  describe('user submit the form', () => {
    beforeEach(() => {
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockRejectedValue({ status: 401 });
    });

    describe('with valid credentials', () => {
      it('redirects user to home page', async () => {
        const { push } = mockUseRouter();
        const mockedLogin = login as jest.Mock;
        mockedLogin.mockResolvedValue(null);

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: 'super-secret-password' },
        });
        fireEvent.click(screen.getByText('Sign in'));

        await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
      });
    });

    describe('with invalid credentials', () => {
      it('renders an error message', async () => {
        const mockedLogin = login as jest.Mock;
        mockedLogin.mockRejectedValue({ status: 400 });

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: 'invalidPassword' },
        });
        fireEvent.click(screen.getByText('Sign in'));

        await waitFor(() => expect(screen.getByText('Invalid Credentials')));
      });
    });

    describe('with missing required inputs', () => {
      it('renders error messages', () => {
        render(<Login />);

        fireEvent.click(screen.getByText('Sign in'));

        expect(screen.getByText("Email can't be blank"));
        expect(screen.getByText("Password can't be blank"));
      });

      it('hides error messages after fill the required inputs', () => {
        render(<Login />);

        fireEvent.click(screen.getByText('Sign in'));

        expect(screen.getByText("Email can't be blank"));
        expect(screen.getByText("Password can't be blank"));

        fireEvent.change(screen.getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
          target: { value: 'super-secret-password' },
        });

        expect(screen.queryByText("Email can't be blank")).toBeNull();
        expect(screen.queryByText("Password can't be blank")).toBeNull();
      });
    });
  });

  describe('given user already authenticated', () => {
    it('redirects user to home page', async () => {
      const { push } = mockUseRouter();

      const user = build('user');
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockResolvedValue(user);

      render(<Login />);

      await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    });
  });
});
