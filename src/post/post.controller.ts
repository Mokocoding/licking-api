import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiFailureResponse } from 'src/decorators/api-failure.response.decorator';
import { findAllPostQueryDto } from 'src/post/dto/find-all-post-query.dto';
import { PostParamDto } from 'src/post/dto/post-param.dto';
import { PostEntity } from 'src/post/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('게시글')
@ApiExtraModels(PostEntity)
@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({
    schema: {
      properties: {
        post: {
          $ref: getSchemaPath(PostEntity),
        },
      },
    },
  })
  @ApiFailureResponse(HttpStatus.BAD_REQUEST, 'id must be an integer')
  @ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  @Post()
  create(@Body() createPostDto: CreatePostDto): { post: PostEntity } {
    const post = this.postService.create(createPostDto);

    return { post };
  }

  @ApiOperation({ summary: '게시글 전체 조회' })
  @ApiOkResponse({
    schema: {
      properties: {
        posts: {
          items: {
            $ref: getSchemaPath(PostEntity),
          },
        },
      },
    },
  })
  @ApiFailureResponse(HttpStatus.BAD_REQUEST, 'title must be an string')
  @ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  @Get()
  findAll(@Query() query: findAllPostQueryDto): { posts: PostEntity[] } {
    const posts = this.postService.findAll(query);

    return { posts };
  }

  @ApiOperation({ summary: '게시글 단일 조회' })
  @ApiOkResponse({
    schema: {
      properties: {
        post: {
          $ref: getSchemaPath(PostEntity),
        },
      },
    },
  })
  @ApiFailureResponse(HttpStatus.BAD_REQUEST, 'id must be an integer')
  @ApiFailureResponse(HttpStatus.NOT_FOUND, 'post ${postId} was not found')
  @ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  @Get(':id')
  findOne(@Param() postParamDto: PostParamDto): { post: PostEntity } {
    const post = this.postService.findOne(postParamDto.id);

    return { post };
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiOkResponse({
    schema: {
      properties: {
        post: {
          $ref: getSchemaPath(PostEntity),
        },
      },
    },
  })
  @ApiFailureResponse(HttpStatus.BAD_REQUEST, 'id must be an integer')
  @ApiFailureResponse(HttpStatus.NOT_FOUND, 'post ${postId} was not found')
  @ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  @Patch(':id')
  update(
    @Param() postParamDto: PostParamDto,
    @Body() updatePostDto: UpdatePostDto,
  ): { post: PostEntity } {
    const post = this.postService.update(postParamDto.id, updatePostDto);

    return { post };
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiFailureResponse(HttpStatus.BAD_REQUEST, 'id must be an integer')
  @ApiFailureResponse(HttpStatus.NOT_FOUND, 'post ${postId} was not found')
  @ApiFailureResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
  @Delete(':id')
  remove(@Param() postParamDto: PostParamDto): void {
    return this.postService.remove(postParamDto.id);
  }
}
