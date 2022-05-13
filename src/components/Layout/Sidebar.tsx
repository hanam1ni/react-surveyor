import React, { Dispatch, SetStateAction } from 'react';
import Avatar from './Avatar';
import { UserProfile } from 'services/user';

import styles from './Layout.module.css';

interface SidebarProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  user: UserProfile;
}

const Sidebar = ({ show, setShow, user }: SidebarProps) => {
  return (
    <>
      {show && (
        <div
          className="fixed top-0 right-0 h-screen w-screen"
          data-testid="sidebar-overlay"
          onClick={() => setShow(false)}
        />
      )}
      <aside className={styles.sidebar} aria-hidden={!show}>
        <section className="flex justify-between items-center">
          <div className="mr-4 font-extrabold text-2xl text-white overflow-hidden text-ellipsis">
            {user.email}
          </div>
          <Avatar user={user} />
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
