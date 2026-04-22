import React from 'react';
import { SkeletonCard, SkeletonHero } from './common/Skeleton';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div>
      <SkeletonHero />
      <div style={{ marginTop: '40px' }}>
        <div style={{ width: '120px', height: '24px', backgroundColor: 'var(--bg-skeleton)', borderRadius: '2px', marginBottom: '20px' }} />
        <div className="st-video-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
