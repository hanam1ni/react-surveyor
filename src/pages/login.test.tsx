import { fireEvent, waitFor } from '@testing-library/react';

import Login from 'pages/login.page';
import { getUserProfile, login } from 'services/user';

import { build } from '@support/factory';
import { renderPage } from '@support/pageRenderer';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');

describe('Login page', () => {
  describe('when the user submits the form', () => {
    beforeEach(() => {
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockRejectedValue({ status: 401 });
    });

    describe('given valid credentials', () => {
      it('redirects user to home page', async () => {
        const { push } = mockUseRouter();
        const mockedLogin = login as jest.Mock;
        mockedLogin.mockResolvedValue(null);

        const { getByLabelText, getByText } = renderPage(<Login />);

        fireEvent.change(getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });
        fireEvent.change(getByLabelText('Password'), {
          target: { value: 'super-secret-password' },
        });
        fireEvent.click(getByText('Sign in'));

        await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
      });
    });

    describe('given invalid credentials', () => {
      it('renders an error message', async () => {
        const mockedLogin = login as jest.Mock;
        mockedLogin.mockRejectedValue({ status: 400 });

        const { getByLabelText, getByText } = renderPage(<Login />);

        fireEvent.change(getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });
        fireEvent.change(getByLabelText('Password'), {
          target: { value: 'invalidPassword' },
        });
        fireEvent.click(getByText('Sign in'));

        await waitFor(() => expect(getByText('Invalid Credentials')));
      });
    });

    describe('when missing required inputs', () => {
      it('renders error messages', async () => {
        const { getByText } = renderPage(<Login />);

        fireEvent.click(getByText('Sign in'));

        await waitFor(() => expect(getByText("Email can't be blank")));
        expect(getByText("Password can't be blank"));
      });

      it('hides error messages after having filled the required inputs', async () => {
        const { getByLabelText, getByText, queryByText } = renderPage(
          <Login />
        );

        fireEvent.click(getByText('Sign in'));

        await waitFor(() => expect(getByText("Email can't be blank")));
        expect(getByText("Password can't be blank"));

        fireEvent.change(getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });
        fireEvent.change(getByLabelText('Password'), {
          target: { value: 'super-secret-password' },
        });

        await waitFor(() =>
          expect(queryByText("Email can't be blank")).toBeNull()
        );
        expect(queryByText("Password can't be blank")).toBeNull();
      });
    });
  });

  describe('when the user is already authenticated', () => {
    it('redirects user to home page', async () => {
      const { push } = mockUseRouter();

      const user = build('user');
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockResolvedValue(user);

      renderPage(<Login />);

      await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    });
  });
});
