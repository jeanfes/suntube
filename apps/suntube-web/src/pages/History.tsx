import React from 'react';
import { useStore } from '../store/useStore';
import { VideoGrid } from '../components/VideoGrid';

export const History: React.FC = () => {
  const { historyVideos } = useStore();

  return (
    <div className="st-interior">
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Historial</h1>
      {historyVideos.length === 0 ? (
        <div className="st-null" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '0' }}>
          <p style={{ color: 'var(--text-muted)' }}>No has visto ningún video aún.</p>
        </div>
      ) : (
        <VideoGrid videos={historyVideos} hideHero={true} />
      )}
    </div>
  );
};
