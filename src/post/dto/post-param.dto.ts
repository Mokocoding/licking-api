import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PostParamDto {
  @ApiProperty({
    description: '게시글 고유 ID',
    format: 'integer',
  })
  @IsInt()
  @Type(() => Number)
  id: number;
}
