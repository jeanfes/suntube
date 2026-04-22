import { Injectable } from '@nestjs/common';
import { VideoDto } from './dto/video.dto';
import * as mockData from '../data/mock-youtube-api.json';

@Injectable()
export class VideosService {
  getVideos(): VideoDto[] {
    return mockData.items.map((item) => {
      const stats = item.statistics;
      const title = item.snippet.title;

      const hype = this.calculateHype(
        title,
        stats.viewCount,
        stats.likeCount,
        stats.commentCount,
      );

      return {
        id: item.id,
        title,
        author: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: this.getRelativeTime(item.snippet.publishedAt),
        hypeLevel: Math.round(hype * 10000) / 10000,
      };
    });
  }

  private calculateHype(
    title: string,
    viewCount: string,
    likeCount: string,
    commentCount: string | undefined,
  ): number {
    if (commentCount === undefined) return 0;

    const views = parseInt(viewCount, 10);
    const likes = parseInt(likeCount, 10);
    const comments = parseInt(commentCount, 10);

    if (views === 0) return 0;

    let hype = (likes + comments) / views;

    if (/tutorial/i.test(title)) {
      hype *= 2;
    }

    return hype;
  }

  private getRelativeTime(isoDate: string): string {
    const now = new Date();
    const published = new Date(isoDate);
    const diffMs = now.getTime() - published.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (diffMs < 0) return 'Recién publicado';
    if (years >= 1) return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
    if (months >= 1) return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    if (days >= 1) return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    if (hours >= 1) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    if (minutes >= 1)
      return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    return `Hace ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
  }
}
