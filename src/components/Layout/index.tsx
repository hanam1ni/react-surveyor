import React, { useState } from 'react';
import Image from 'next/image';

import Avatar from './Avatar';
import Sidebar from './Sidebar';
import { UserProfile } from 'services/user';

interface LayoutProps {
  user?: UserProfile | null;
  children: React.ReactNode;
}

const Layout = ({ user, children }: LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-full flex flex-col">
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
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
