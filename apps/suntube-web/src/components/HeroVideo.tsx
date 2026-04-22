import React from 'react';
import type { VideoData } from '../types';
import { Link } from 'react-router-dom';
import { SafeImage } from './common/SafeImage';
import { Crown } from 'lucide-react';

interface HeroVideoProps {
  video: VideoData;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ video }) => {
  const initial = video.author.charAt(0).toUpperCase();

  return (
    <div className="st-spotlight-wrapper">
      <Link to={`/watch/${video.id}`} className="st-spotlight-anchor">
        <div className="st-spotlight-hero" style={{ border: 'none', height: 'auto', minHeight: '380px' }}>
          <div className="st-hero-visual" style={{ flex: 1.5, position: 'relative' }}>
            <SafeImage src={video.thumbnail} alt={video.title} />
            <div className="st-card-tag" style={{ 
              bottom: 'auto', 
              top: '24px', 
              left: '24px', 
              backgroundColor: 'var(--accent)', 
              color: 'var(--bg-darker)', 
              borderRadius: '6px', 
              padding: '8px 16px', 
              fontWeight: 800, 
              fontSize: '14px',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
            }}>
               <Crown size={16} /> JOYA DE LA CORONA
            </div>
          </div>
          <div className="st-hero-info" style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <h2 className="st-hero-h2" style={{ color: 'var(--text-main)', fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px' }}>{video.title}</h2>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div className="st-avatar-md" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-darker)', fontWeight: 700, width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{initial}</div>
                <span style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-main)' }}>{video.author}</span>
             </div>
             
             
             <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                <div>
                   <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Hype Score</div>
                   <div className="st-hero-score" style={{ color: 'var(--accent)', fontSize: '48px', fontWeight: 800, lineHeight: 1 }}>{video.hypeLevel}</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>
                  {video.publishedAt}
                </div>
             </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
