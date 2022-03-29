import { getByText, render } from '@testing-library/react';

import Container from 'components/Container';

describe('Container', () => {
  it('renders the given element inside the container', () => {
    const Greeting = () => <div>Welcome John Doe</div>;

    const { container } = render(
      <Container>
        <Greeting />
      </Container>
    );

    expect(getByText(container, 'Welcome John Doe'));
  });
});
