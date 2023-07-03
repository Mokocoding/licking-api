import { Injectable, NotFoundException } from '@nestjs/common';
import { findAllPostQueryDto } from 'src/post/dto/find-all-post-query.dto';
import { PostEntity } from 'src/post/entities/post.entity';
import { PostRepository } from 'src/post/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  create(createPostDto: CreatePostDto): PostEntity {
    return this.postRepository.create(createPostDto);
  }

  findAll(query: findAllPostQueryDto): PostEntity[] {
    return this.postRepository.findAll(query.title);
  }

  findOne(id: number): PostEntity {
    const existPost = this.postRepository.findOneById(id);

    if (!existPost) {
      throw new NotFoundException(`post ${id} was not found`);
    }

    return existPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): PostEntity {
    const existPost = this.postRepository.findOneById(id);

    if (!existPost) {
      throw new NotFoundException(`post ${id} was not found`);
    }

    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number): void {
    const existPost = this.postRepository.findOneById(id);

    if (!existPost) {
      throw new NotFoundException(`post ${id} was not found`);
    }

    return this.postRepository.delete(id);
  }
}
