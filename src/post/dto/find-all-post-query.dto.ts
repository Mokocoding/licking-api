import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class findAllPostQueryDto {
  @ApiPropertyOptional({
    description: 'title 검색 필터',
  })
  @IsOptional()
  title: string;
}
