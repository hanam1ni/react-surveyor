import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface ComponentProps {
  children: React.ReactElement;
  isLoading: boolean;
}

const PageLoader = ({ children, isLoading }: ComponentProps) => {
  return isLoading ? (
    <div className="text-5xl text-neutral-300 animate-spin">
      <FontAwesomeIcon icon={solid('circle-notch')} />
    </div>
  ) : (
    children
  );
};

export default PageLoader;
