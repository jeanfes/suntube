import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VideoData } from '../types';

interface StoreState {
  likedVideos: VideoData[];
  toggleLike: (video: VideoData) => void;
  historyVideos: VideoData[];
  addToHistory: (video: VideoData) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      likedVideos: [],
      toggleLike: (video) => set((state) => {
        const isLiked = state.likedVideos.some(v => v.id === video.id);
        if (isLiked) {
          return { likedVideos: state.likedVideos.filter(v => v.id !== video.id) };
        } else {
          return { likedVideos: [...state.likedVideos, video] };
        }
      }),
      historyVideos: [],
      addToHistory: (video) => set((state) => {
        const filteredHistory = state.historyVideos.filter(v => v.id !== video.id);
        return { historyVideos: [video, ...filteredHistory] };
      }),
    }),
    {
      name: 'suntube-storage',
    }
  )
);
