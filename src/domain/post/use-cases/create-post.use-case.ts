import { injectable } from 'tsyringe';
import { PostRepository, type ICreatePostInput } from '../post.repo';
import { PostInvalidDataError } from '../errors/post-invalid-data.error';
import type { IPost } from '../post.entity';

@injectable()
export class CreatePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(payload: ICreatePostInput): Promise<IPost> {
    const { title, content } = payload;

    if (!title || title.trim() === '') throw new PostInvalidDataError('Title is required');
    if (!content || content.trim() === '') throw new PostInvalidDataError('Content is required');

    const post = await this.postRepo.create(payload);

    return post;
  }
}
