import React from 'react';

import SkeletonLoader from 'components/SkeletonLoader';

interface SurveyListSkeletonProps {
  children: React.ReactElement;
  isLoading: boolean;
}

const SurveyListSkeleton = ({
  children,
  isLoading,
}: SurveyListSkeletonProps) => {
  if (!isLoading) {
    return children;
  }

  return (
    <>
      <SkeletonLoader width={120} height={25} className="mb-4" />
      <SkeletonLoader width={95} height={25} className="mb-16" />
      <SkeletonLoader width="100%" height={302} className="mb-10 rounded-xl" />
      <div className="flex justify-between">
        <div>
          <SkeletonLoader width={320} height={20} className="mb-4" />
          <SkeletonLoader width={240} height={20} />
        </div>
        <div>
          <SkeletonLoader width={56} height={56} />
        </div>
      </div>
    </>
  );
};

export default SurveyListSkeleton;
