import { render } from '@testing-library/react';

import PageLoader from 'components/PageLoader';

describe('PageLoader', () => {
  describe('given isLoading is true', () => {
    it('renders the loading spinner', () => {
      const Greeting = () => <div>Welcome John Doe</div>;

      const { getByTestId } = render(
        <PageLoader isLoading={true}>
          <Greeting />
        </PageLoader>
      );

      const spinner = getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('given isLoading is false', () => {
    it('renders the given page', () => {
      const Greeting = () => <div>Welcome John Doe</div>;

      const { getByText } = render(
        <PageLoader isLoading={false}>
          <Greeting />
        </PageLoader>
      );

      expect(getByText('Welcome John Doe')).toBeInTheDocument();
    });
  });
});
