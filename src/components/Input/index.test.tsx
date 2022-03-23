import { render } from '@testing-library/react';

import Input from 'components/Input';

describe('Input', () => {
  it('renders input with the given label', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <Input label="Email" placeholder="User Email" />
    );

    expect(getByLabelText('Email'));
    expect(getByPlaceholderText('User Email'));
  });
});
