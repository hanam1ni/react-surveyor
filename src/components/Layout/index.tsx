import React, { useState } from 'react';
import Image from 'next/image';

import Avatar from './Avatar';
import Sidebar from './Sidebar';
import { UserProfile } from 'services/user';

interface ComponentProps {
  user?: UserProfile | null;
  children: React.ReactNode;
}

const Layout = ({ user, children }: ComponentProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <header className="flex px-8 pt-8 mb-11 justify-between">
        <Image src="/nimble.svg" alt="Nimble Logo" width={134} height={32} />
        {user && (
          <div className="cursor-pointer" onClick={() => setShowSidebar(true)}>
            <Avatar user={user} />
          </div>
        )}
      </header>
      {user && (
        <Sidebar show={showSidebar} setShow={setShowSidebar} user={user} />
      )}
      {children}
    </>
  );
};

export default Layout;
