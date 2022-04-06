import { render } from '@testing-library/react';

import FlashNotice from 'components/FlashNotice';

describe('FlashNotice', () => {
  it('renders the given error messages', () => {
    const errors = ["Email can't be blank", "Password can't be blank"];

    const { getByText } = render(
      <FlashNotice title="Error" messages={errors} type="warning" />
    );

    expect(getByText("Email can't be blank"));
    expect(getByText("Password can't be blank"));
  });

  describe('with empty errors', () => {
    it('it hides error flash', () => {
      const errors: string[] = [];

      const { container } = render(
        <FlashNotice title="Error" messages={errors} type="warning" />
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
