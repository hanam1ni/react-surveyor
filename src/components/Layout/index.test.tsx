import {
  fireEvent,
  getByAltText,
  render,
  waitFor,
} from '@testing-library/react';

import Layout from 'components/Layout';
import Avatar from './Avatar';
import Sidebar from './Sidebar';
import { logout, UserProfile } from 'services/user';
import { ACTIONS, StoreProvider } from 'store';
import reducer from 'store/reducer';

import { build } from '@support/factory';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');
jest.mock('store/reducer');

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

  describe('when logging out', () => {
    it('redirects user to the login page', async () => {
      const user = build('user') as UserProfile;
      const setShow = jest.fn();

      const { push } = mockUseRouter();
      const mockedLogout = logout as jest.Mock;
      mockedLogout.mockResolvedValue(null);

      const { getByText } = render(
        <StoreProvider>
          <Sidebar show={true} setShow={setShow} user={user} />
        </StoreProvider>
      );

      fireEvent.click(getByText('Logout'));

      await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
      expect(reducer).toHaveBeenCalledWith(expect.any(Object), {
        type: ACTIONS.CLEAR_STORE,
      });
    });
  });
});
