import { ApiProperty } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty({
    description: '게시글 고유 ID',
    format: 'integer',
  })
  id: number;

  @ApiProperty({
    description: '제목',
    minLength: 1,
    maxLength: 255,
  })
  title: string;

  @ApiProperty({
    description: '제목',
    minLength: 1,
    maxLength: 1000,
  })
  description: string;

  @ApiProperty({
    description: '생성일',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
  })
  updatedAt: Date;

  constructor(data: PostEntity) {
    Object.assign(this, data);
  }
}
