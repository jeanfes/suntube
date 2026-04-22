import React from 'react';
import type { VideoData } from '../types';
import { VideoCard } from './VideoCard';
import { HeroVideo } from './HeroVideo';

interface VideoGridProps {
  videos: VideoData[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  if (videos.length === 0) {
    return <div className="st-null">No se encontraron videos disponibles.</div>;
  }

  const featured = [...videos].sort((a, b) => b.hypeLevel - a.hypeLevel)[0];
  const others = videos.filter(v => v.id !== featured.id);

  return (
    <div>
      <HeroVideo video={featured} />
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '18px', backgroundColor: 'var(--accent)' }}></div>
          Más videos
        </h2>
        <div className="st-video-grid">
          {others.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};
