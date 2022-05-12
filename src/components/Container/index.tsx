import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

interface BackgroundContextType {
  setBgUrl: Dispatch<SetStateAction<string | null>>;
}

export const BackgroundContext = React.createContext<BackgroundContextType>(
  {} as BackgroundContextType
);

const Container = ({ children }: ContainerProps) => {
  const [bgUrl, setBgUrl] = useState<string | null>(null);

  return (
    <div
      className={`${styles['container']} ${
        bgUrl !== null ? 'bg-cover' : 'bg-black'
      }`}
      style={bgUrl !== null ? { backgroundImage: `url('${bgUrl}')` } : {}}
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
