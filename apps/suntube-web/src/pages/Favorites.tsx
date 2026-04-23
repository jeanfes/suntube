import React from 'react';
import { useStore } from '../store/useStore';
import { VideoGrid } from '../components/VideoGrid';

export const Favorites: React.FC = () => {
  const { likedVideos } = useStore();

  return (
    <div className="st-interior">
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Videos que me gustan</h1>
      {likedVideos.length === 0 ? (
        <div className="st-null" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '0' }}>
          <p style={{ color: 'var(--text-muted)' }}>Aún no has marcado ningún video con "Me gusta".</p>
        </div>
      ) : (
        <VideoGrid videos={likedVideos} hideHero={true} />
      )}
    </div>
  );
};
