import { render } from '@testing-library/react';

import BackNavigation from 'components/BackNavigation';

describe('BackNavigation', () => {
  it('renders link to the given path', () => {
    const { getByRole } = render(<BackNavigation path="/login" />);

    expect(getByRole('link')).toHaveAttribute('href', '/login');
  });
});
