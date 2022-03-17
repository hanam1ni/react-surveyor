import { render, screen, fireEvent } from '@testing-library/react';

import Login from 'pages/login';

describe('Login', () => {
  it('if submit the form with missing required params, renders error messages', () => {
    render(<Login />);

    fireEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText("Email can't be blank"));
    expect(screen.getByText("Password can't be blank"));
  });
});
