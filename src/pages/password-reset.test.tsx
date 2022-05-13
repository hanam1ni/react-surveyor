import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Container from 'components/Container';
import PasswordReset from 'pages/password-reset.page';
import { getUserProfile, resetPassword } from 'services/user';

import { build } from '@support/factory';
import { renderPage } from '@support/pageRenderer';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');

describe('Password reset page', () => {
  describe('when the user submits the form', () => {
    beforeEach(() => {
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockRejectedValue({ status: 401 });
    });

    describe('given the email', () => {
      describe('when requesting a password reset successfully', () => {
        it('renders the success message', async () => {
          const mockedResetPassword = resetPassword as jest.Mock;
          mockedResetPassword.mockResolvedValue({
            meta: {
              message:
                'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.',
            },
          });

          renderPage(<PasswordReset />);

          await waitFor(() =>
            fireEvent.change(screen.getByLabelText('Email'), {
              target: { value: 'user@mail.com' },
            })
          );
          fireEvent.click(screen.getByText('Send Recovery Email'));

          await waitFor(() =>
            expect(
              screen.getByText(
                "We've emailed you instructions to reset your password."
              )
            )
          );
        });
      });

      describe('failed to request password reset', () => {
        it('renders the error message', async () => {
          const mockedResetPassword = resetPassword as jest.Mock;
          mockedResetPassword.mockRejectedValue({ status: 403 });

          renderPage(<PasswordReset />);

          await waitFor(() =>
            fireEvent.change(screen.getByLabelText('Email'), {
              target: { value: 'user@mail.com' },
            })
          );
          fireEvent.click(screen.getByText('Send Recovery Email'));

          await waitFor(() =>
            expect(
              screen.getByText('Something went wrong. Please try again later')
            )
          );
        });
      });
    });

    describe('given NO email', () => {
      it('renders the error message', async () => {
        renderPage(<PasswordReset />);

        await waitFor(() =>
          fireEvent.click(screen.getByText('Send Recovery Email'))
        );

        expect(screen.getByText("Email can't be blank"));
      });

      it('hides the error message after entering the email', async () => {
        renderPage(<PasswordReset />);

        await waitFor(() =>
          fireEvent.click(screen.getByText('Send Recovery Email'))
        );

        expect(screen.getByText("Email can't be blank"));

        fireEvent.change(screen.getByLabelText('Email'), {
          target: { value: 'user@mail.com' },
        });

        expect(screen.queryByText("Email can't be blank")).toBeNull();
      });
    });
  });

  describe('when the user is already authenticated', () => {
    it('redirects user to home page', async () => {
      const { push } = mockUseRouter();

      const user = build('user');
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockResolvedValue(user);

      render(
        <Container>
          <PasswordReset />
        </Container>
      );

      await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
    });
  });
});
