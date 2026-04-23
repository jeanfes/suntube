import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { VideoData } from '../types';
import { fetchVideos } from '../services/api';
import { VideoGrid } from '../components/VideoGrid';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchVideos();
        const filtered = data.filter(video =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.author.toLowerCase().includes(query.toLowerCase())
        );
        setVideos(filtered);
      } catch (err) {
        console.error('Error loading videos for search:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [query]);

  return (
    <div className="st-interior">
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
        Resultados para: <span style={{ color: 'var(--accent)' }}>{query}</span>
      </h1>
      {loading ? (
        <LoadingSkeleton />
      ) : videos.length === 0 ? (
        <div className="st-null" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '0' }}>
          <p style={{ color: 'var(--text-muted)' }}>No se encontraron videos para esta búsqueda.</p>
        </div>
      ) : (
        <VideoGrid videos={videos} hideHero={true} />
      )}
    </div>
  );
};
