import {
  fireEvent,
  getByAltText,
  render,
  waitFor,
} from '@testing-library/react';

import Layout from 'components/Layout';
import Avatar from './Avatar';
import Sidebar from './Sidebar';
import { UserProfile } from 'services/user';

import { build } from '@support/factory';

describe('Layout', () => {
  it('renders the given element', () => {
    const Greeting = () => <div>Welcome John Doe</div>;

    const { getByText } = render(
      <Layout>
        <Greeting />
      </Layout>
    );

    expect(getByText('Welcome John Doe')).toBeInTheDocument();
  });

  describe('when clicking on the user avatar', () => {
    it('renders sidebar', async () => {
      const user = build('user') as UserProfile;

      const Greeting = () => <div>Welcome John Doe</div>;

      const { container } = render(
        <Layout user={user}>
          <Greeting />
        </Layout>
      );

      const header = container.querySelector('header') as HTMLElement;

      fireEvent.click(getByAltText(header, 'user avatar'));

      await waitFor(() =>
        expect(
          container.querySelector('aside[aria-hidden="false"]')
        ).toBeInTheDocument()
      );
    });
  });
});

describe('Avatar', () => {
  it('renders avatar from the given user', () => {
    const user = build('user') as UserProfile;

    const { getByAltText } = render(<Avatar user={user} />);

    const avatar = getByAltText('user avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', user.avatarUrl);
  });

  describe('given empty avatar url', () => {
    it('renders avatar placeholder', () => {
      const user = build('user', { avatarUrl: null }) as UserProfile;

      const { getByText } = render(<Avatar user={user} />);

      expect(getByText(user.email[0].toUpperCase())).toBeInTheDocument();
    });
  });
});

describe('Sidebar', () => {
  describe('when clicking on overlay', () => {
    it('calls the given setShow callback', () => {
      const user = build('user') as UserProfile;
      const setShow = jest.fn();

      const { getByTestId } = render(
        <Sidebar show={true} setShow={setShow} user={user} />
      );

      fireEvent.click(getByTestId('sidebar-overlay'));

      expect(setShow).toHaveBeenCalledWith(false);
    });
  });
});