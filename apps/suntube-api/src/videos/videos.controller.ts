import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideoDto } from './dto/video.dto';

@Controller('api/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getVideos(): VideoDto[] {
    return this.videosService.getVideos();
  }
}
