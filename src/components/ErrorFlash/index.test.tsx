import { render } from '@testing-library/react';

import ErrorFlash from 'components/ErrorFlash';

describe('ErrorFlash', () => {
  it('renders the given error messages', () => {
    const errors = ["Email can't be blank", "Password can't be blank"];

    const { getByText } = render(<ErrorFlash errors={errors} />);

    expect(getByText("Email can't be blank"));
    expect(getByText("Password can't be blank"));
  });

  describe('with empty errors', () => {
    it('it hides error flash', () => {
      const errors: string[] = [];

      const { container } = render(<ErrorFlash errors={errors} />);

      expect(container.firstChild).toBeNull();
    });
  });
});