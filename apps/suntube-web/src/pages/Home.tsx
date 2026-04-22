import React, { useEffect, useState } from 'react';
import type { VideoData } from '../types';
import { fetchVideos } from '../services/api';
import { VideoGrid } from '../components/VideoGrid';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';

export const Home: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchVideos();
      setVideos(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  return (
    <div className="st-interior">
      {loading && <LoadingSkeleton />}
      {!loading && error && <ErrorState retry={loadData} />}
      {!loading && !error && <VideoGrid videos={videos} />}
    </div>
  );
};
