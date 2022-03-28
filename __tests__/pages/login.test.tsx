import { fireEvent, render, screen } from '@testing-library/react';

import Login from 'pages/login';

describe('Login page', () => {
  describe('if submits the form with missing required inputs', () => {
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
