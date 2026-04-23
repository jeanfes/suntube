import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageSquare, Crown } from 'lucide-react';
import type { VideoData } from '../types';
import { fetchVideos } from '../services/api';
import { SafeImage } from '../components/common/SafeImage';
import { Skeleton } from '../components/common/Skeleton';
import { useStore } from '../store/useStore';

export const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { likedVideos, toggleLike, addToHistory } = useStore();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchVideos();
      setVideos(data);
      setLoading(false);
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const sortedVideos = [...videos].sort((a, b) => b.hypeLevel - a.hypeLevel);
  const currentVideo = sortedVideos.find(v => v.id === id) || sortedVideos[0];
  const isTopHype = currentVideo ? sortedVideos[0]?.id === currentVideo.id : false;
  const related = currentVideo ? sortedVideos.filter(v => v.id !== currentVideo.id).slice(0, 15) : [];
  const isLiked = currentVideo ? likedVideos.some(v => v.id === currentVideo.id) : false;

  useEffect(() => {
    if (currentVideo && !loading) {
      addToHistory(currentVideo);
    }
  }, [currentVideo, loading, addToHistory]);

  if (loading || !currentVideo) return (
    <div className="st-view-theater">
      <div className="st-player-wing">
        <Skeleton.Rect width="100%" height="calc(100vh - 200px)" borderRadius="0" />
        <div style={{ padding: '25px 30px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Skeleton.Circle width="60px" height="60px" />
            <div style={{ flex: 1 }}>
              <Skeleton.Line width="40%" height="24px" />
              <Skeleton.Line width="20%" />
            </div>
          </div>
        </div>
      </div>
      <aside className="st-chat-wing" style={{ padding: '15px' }}>
        <Skeleton.Line width="60%" />
        <div style={{ height: '10px' }} />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <Skeleton.Rect width="120px" height="68px" />
            <div style={{ flex: 1 }}>
              <Skeleton.Line width="90%" />
              <Skeleton.Line width="40%" />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );

  return (
    <div className="st-view-theater">
      <div className="st-player-wing">
        <div style={{ backgroundColor: '#000', width: '100%', height: 'calc(100vh - 200px)', display: 'grid', placeItems: 'center', position: 'relative' }}>
          <SafeImage
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
          {isTopHype && (
            <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#ffd700', color: '#000', padding: '8px 16px', borderRadius: '4px', fontWeight: 800, fontSize: '12px', boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Crown size={16} /> LA JOYA DE LA CORONA
            </div>
          )}
        </div>
        <div style={{ padding: '30px 40px', backgroundColor: 'var(--bg-darker)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '3px', height: '14px', backgroundColor: 'var(--accent)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>{currentVideo.publishedAt}</span>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.2, textTransform: 'uppercase' }}>
                {currentVideo.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>{currentVideo.author}</span>


                <div style={{ marginLeft: '10px', padding: '4px 10px', backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--accent)' }}>HYPE SCORE: {currentVideo.hypeLevel}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
              <button
                className="st-btn"
                onClick={() => toggleLike(currentVideo)}
                style={{
                  backgroundColor: isLiked ? 'var(--accent)' : 'var(--bg-light)',
                  color: isLiked ? '#000' : 'var(--text-main)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '13px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Heart size={16} fill={isLiked ? '#000' : 'none'} color={isLiked ? '#000' : 'currentColor'} />
                {isLiked ? 'Te gusta' : 'Me gusta'}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', alignItems: 'center' }}>
            <div className="st-avatar-lg" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-darker)', width: '50px', height: '50px' }}>{currentVideo.author.charAt(0).toUpperCase()}</div>
            <div>
              <p style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '15px' }}>{currentVideo.author}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Canal de Hype Tecnológico Verificado</p>
            </div>
          </div>
        </div>
      </div>
      <aside className="st-chat-wing">
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-main)', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>
          <MessageSquare size={16} />
          Canales recomendados
        </div>
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {related.map(vid => (
            <Link key={vid.id} to={`/watch/${vid.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="st-related-item">
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '100px', aspectRatio: '16/9', backgroundColor: 'var(--bg-darker)', flexShrink: 0, borderRadius: '4px', overflow: 'hidden' }}>
                  <SafeImage src={vid.thumbnail} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <h4 className="st-title-clamp" style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 700 }}>{vid.title}</h4>
                  <p className="st-author-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{vid.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};
