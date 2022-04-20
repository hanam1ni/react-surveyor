import { render } from '@testing-library/react';

import FlashNotice from 'components/FlashNotice';

describe('FlashNotice', () => {
  it('renders the title and the given messages', () => {
    const messages = ["Email can't be blank", "Password can't be blank"];

    const { getByText } = render(
      <FlashNotice title="Error" messages={messages} />
    );

    expect(getByText('Error')).toBeInTheDocument();
    expect(getByText("Email can't be blank")).toBeInTheDocument();
    expect(getByText("Password can't be blank")).toBeInTheDocument();
  });

  describe('given success type', () => {
    it('renders success icon', () => {
      const { getByAltText } = render(
        <FlashNotice title="Notice" messages={['Success']} type="success" />
      );

      expect(getByAltText('success icon')).toBeInTheDocument();
    });
  });

  describe('given warning type', () => {
    it('renders warning icon', () => {
      const { getByAltText } = render(
        <FlashNotice
          title="Error"
          messages={["Email can't be blank"]}
          type="warning"
        />
      );

      expect(getByAltText('warning icon')).toBeInTheDocument();
    });
  });

  describe('given empty message', () => {
    it('hides the flash notice', () => {
      const messages: string[] = [];

      const { container } = render(
        <FlashNotice title="Notice" messages={messages} />
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
