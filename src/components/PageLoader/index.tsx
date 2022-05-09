import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface ComponentProps {
  children: React.ReactElement;
  isLoading: boolean;
}

const PageLoader = ({ children, isLoading }: ComponentProps) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="text-5xl text-neutral-300">
        <FontAwesomeIcon
          className="animate-spin"
          icon={solid('circle-notch')}
        />
      </div>
    </div>
  );
};

export default PageLoader;
