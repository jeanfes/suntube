import type { VideoData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchVideos = async (): Promise<VideoData[]> => {
  const response = await fetch(`${API_URL}/api/videos`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
};
