import { render } from '@testing-library/react';

import Button from 'components/Button';

describe('Button', () => {
  it('renders button with the given label', () => {
    const { getByRole } = render(<Button label="Submit" />);

    expect(getByRole('button', { name: 'Submit' }));
  });
});
