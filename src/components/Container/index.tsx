import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

interface BackgroundContextType {
  setBgUrl: Dispatch<SetStateAction<string>>;
}

export const BackgroundContext = React.createContext<BackgroundContextType>(
  {} as BackgroundContextType
);

const Container = ({ children }: ContainerProps) => {
  const [bgUrl, setBgUrl] = useState<string>('');

  if (bgUrl == '') {
    return (
      <div className={`${styles['container']} bg-black`}>
        <BackgroundContext.Provider value={{ setBgUrl }}>
          {children}
        </BackgroundContext.Provider>
      </div>
    );
  }

  return (
    <div
      className={`${styles['container']} bg-cover`}
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className={styles['backdrop']}>
        <BackgroundContext.Provider value={{ setBgUrl }}>
          {children}
        </BackgroundContext.Provider>
      </div>
    </div>
  );
};

export default Container;
