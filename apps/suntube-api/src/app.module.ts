import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VideosModule,
  ],
})
export class AppModule {}
