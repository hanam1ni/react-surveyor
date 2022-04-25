import React from 'react';

import styles from './Container.module.css';

interface ComponentProps {
  children: React.ReactNode;
}

const Container = ({ children }: ComponentProps) => {
  return (
    <div className="relative w-screen h-screen bg-auth bg-cover overflow-hidden">
      <div className={styles['backdrop']}>{children}</div>
    </div>
  );
};

export default Container;
