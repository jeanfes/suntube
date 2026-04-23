import React from 'react';
import type { VideoData } from '../types';
import { Link } from 'react-router-dom';
import { SafeImage } from './common/SafeImage';

interface VideoCardProps {
  video: VideoData;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const initial = video.author.charAt(0).toUpperCase();

  return (
    <Link to={`/watch/${video.id}`} className="st-video-card">
      <div className="st-card-preview">
        <SafeImage 
          src={video.thumbnail} 
          alt={video.title} 
          loading="lazy" 
        />
        <div className="st-card-tag" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', color: '#fff', borderRadius: '4px', padding: '4px 8px', fontWeight: 500, fontSize: '12px', bottom: '8px', top: 'auto', right: '8px', left: 'auto' }}>Hype {video.hypeLevel}</div>
      </div>
      <div className="st-card-body" style={{ padding: '12px 0 0 0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div className="st-avatar-md" style={{ backgroundColor: 'var(--bg-light, #2a2a2a)', color: 'var(--text-main)', fontWeight: 600, width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{initial}</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h3 className="st-title-clamp" style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: 600, marginBottom: '4px', lineHeight: 1.4 }}>{video.title}</h3>
          <p className="st-author-text" style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400, marginBottom: '2px' }}>{video.author}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400 }}>
            {video.publishedAt}
          </p>
        </div>
      </div>
    </Link>
  );
};
