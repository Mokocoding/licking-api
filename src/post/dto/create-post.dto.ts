import { PickType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { PostEntity } from 'src/post/entities/post.entity';

export class CreatePostDto extends PickType(PostEntity, [
  'title',
  'description',
] as const) {
  @Length(1, 255)
  @IsString()
  title: string;

  @Length(1, 1000)
  @IsString()
  description: string;
}
