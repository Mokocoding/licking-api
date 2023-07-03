import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class PostRepository {
  private nextId = 1;
  private posts: PostEntity[] = [];

  create(createPostDto: CreatePostDto): PostEntity {
    const newPost = new PostEntity({
      id: this.nextId++,
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.posts.push(newPost);

    return newPost;
  }

  findOneById(postId: number): PostEntity {
    const existPost = this.posts.find((post) => {
      return post.id === postId;
    });

    if (!existPost) {
      return null;
    }

    return existPost;
  }

  findAll(title?: string): PostEntity[] {
    if (title) {
      return this.posts.filter((post) => {
        return post.title.includes(title);
      });
    }

    return this.posts;
  }

  update(postId: number, updatePostDto: UpdatePostDto): PostEntity {
    const existPostIdx = this.getPostIdx(postId);

    this.posts[existPostIdx].title = updatePostDto.title;
    this.posts[existPostIdx].description = updatePostDto.description;

    return this.posts[existPostIdx];
  }

  delete(postId: number): void {
    const existPostIdx = this.getPostIdx(postId);

    this.posts.splice(existPostIdx, 1);

    return;
  }

  private getPostIdx(postId: number): number {
    const existPostIdx = this.posts.findIndex((post) => {
      return post.id === postId;
    });

    if (existPostIdx === -1) {
      throw new InternalServerErrorException();
    }

    return existPostIdx;
  }
}
