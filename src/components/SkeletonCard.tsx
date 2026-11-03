import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-card overflow-hidden trip-card-shadow border border-outline-variant/30 p-6 space-y-4 animate-pulse">
      {/* Banner Placeholder */}
      <div className="h-44 bg-outline-variant/20 rounded-2xl w-full"></div>

      {/* Header Placeholder */}
      <div className="space-y-2">
        <div className="h-6 bg-outline-variant/30 rounded w-3/4"></div>
        <div className="h-4 bg-outline-variant/20 rounded w-1/2"></div>
      </div>

      {/* Description Placeholder */}
      <div className="space-y-1.5 pt-2">
        <div className="h-3 bg-outline-variant/20 rounded w-full"></div>
        <div className="h-3 bg-outline-variant/20 rounded w-4/5"></div>
      </div>

      {/* Button Placeholder */}
      <div className="pt-4 flex gap-3">
        <div className="h-11 bg-primary-fixed/50 rounded-xl flex-1"></div>
        <div className="h-11 w-11 bg-outline-variant/20 rounded-xl shrink-0"></div>
      </div>
    </div>
  );
};

export const SkeletonPage: React.FC = () => {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-8 animate-pulse">
      <div className="h-10 bg-outline-variant/20 rounded-xl w-1/3"></div>
      <div className="h-5 bg-outline-variant/15 rounded-lg w-2/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};
