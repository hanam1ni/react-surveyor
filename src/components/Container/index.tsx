import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

interface BackgroundContextType {
  setBgUrl: Dispatch<SetStateAction<string | null>>;
}

export const BackgroundContext = createContext<BackgroundContextType>(
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
      <BackgroundContext.Provider value={{ setBgUrl }}>
        <div className="h-screen relative z-20">{children}</div>
      </BackgroundContext.Provider>
      <div className={styles['backdrop']} />
    </div>
  );
};

export default Container;
