import { injectable } from 'tsyringe';

import { PostInvalidDataError } from '../errors/post-invalid-data.error';
import { PostRepository } from '../post.repo';
import type { IPost } from '../post.entity';
import type { IUpdatePostInput } from '../post.repo';

@injectable()
export class UpdatePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: number, payload: IUpdatePostInput): Promise<IPost> {
    if (!id) throw new PostInvalidDataError('Post ID is required');

    const { title, content } = payload;

    if (!title || title.trim() === '') throw new PostInvalidDataError('Title cannot be empty');
    if (!content || content.trim() === '')
      throw new PostInvalidDataError('Content cannot be empty');

    const updatedPost = await this.postRepo.update(id, payload);

    return updatedPost;
  }
}
