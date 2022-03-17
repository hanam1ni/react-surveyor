import React from 'react';

interface ComponentProps {
  children: React.ReactNode;
}

const Container = ({ children }: ComponentProps) => {
  return (
    <div className="relative w-screen h-screen bg-auth bg-cover">
      <div className="absolute w-full h-full bg-black bg-opacity-60 backdrop-blur-3xl flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Container;
