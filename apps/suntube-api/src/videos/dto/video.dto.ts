import { IsString, IsNumber, IsUrl } from 'class-validator';

export class VideoDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsUrl()
  thumbnail: string;

  @IsString()
  publishedAt: string;

  @IsNumber()
  hypeLevel: number;
}
