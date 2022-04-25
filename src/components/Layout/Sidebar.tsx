import React from 'react';
import Avatar from './Avatar';
import { UserProfile } from 'services/user';

import styles from './Layout.module.css';

interface ComponentProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProfile;
}

const Sidebar = ({ show, setShow, user }: ComponentProps) => {
  return (
    <>
      {show && (
        <div
          className="fixed top-0 right-0 h-screen w-screen"
          onClick={() => setShow(false)}
        />
      )}
      <aside className={styles.sidebar} aria-hidden={!show}>
        <section className="flex justify-between items-center">
          <div className="font-extrabold text-white">{user.email}</div>
          <Avatar user={user} />
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
