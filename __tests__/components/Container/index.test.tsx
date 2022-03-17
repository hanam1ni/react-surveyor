import { render, getByText } from '@testing-library/react';

import Container from 'components/Container';

describe('Container', () => {
  it('renders the given element inside the container', () => {
    const Greeting = () => <div>Welcome John Doe</div>;

    render(
      <Container>
        <Greeting />
      </Container>
    );

    const container = document.querySelector(
      '.bg-auth .backdrop-blur-3xl'
    ) as HTMLElement;
    expect(getByText(container, 'Welcome John Doe'));
  });
});
