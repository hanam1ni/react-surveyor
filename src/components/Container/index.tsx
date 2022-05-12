import React from 'react';

import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="relative w-screen h-screen bg-auth bg-cover overflow-hidden">
      <div className={styles['backdrop']}>{children}</div>
    </div>
  );
};

export default Container;
