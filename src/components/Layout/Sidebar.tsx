import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';

import Avatar from './Avatar';
import { logout, UserProfile } from 'services/user';
import { ACTIONS, StoreContext } from 'store';

import styles from './Layout.module.css';

interface SidebarProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  user: UserProfile;
}

const Sidebar = ({ show, setShow, user }: SidebarProps) => {
  const router = useRouter();
  const { dispatchAction } = useContext(StoreContext);

  const onLogout = async () => {
    await logout();
    dispatchAction({ type: ACTIONS.CLEAR_STORE });
    router.push('/login');
  };

  return (
    <>
      {show && (
        <div
          className="fixed top-0 right-0 h-screen w-screen z-50"
          data-testid="sidebar-overlay"
          onClick={() => setShow(false)}
        />
      )}
      <aside className={styles.sidebar} aria-hidden={!show}>
        <section className="pb-5 mb-9 flex justify-between items-center border-b border-b-zinc-600">
          <div className="mr-4 font-extrabold text-2xl text-white overflow-hidden text-ellipsis">
            {user.email}
          </div>
          <Avatar user={user} />
        </section>
        <a onClick={onLogout} className="cursor-pointer text-xl text-zinc-400">
          Logout
        </a>
      </aside>
    </>
  );
};

export default Sidebar;
