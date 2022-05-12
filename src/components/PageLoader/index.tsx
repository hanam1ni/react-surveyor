import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface PageLoaderProps {
  children: React.ReactElement;
  isLoading: boolean;
}

const PageLoader = ({ children, isLoading }: PageLoaderProps) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="text-5xl text-neutral-300">
        <FontAwesomeIcon
          className="animate-spin"
          data-testid="loading-spinner"
          icon={solid('circle-notch')}
        />
      </div>
    </div>
  );
};

export default PageLoader;
