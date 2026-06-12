import { injectable } from 'tsyringe';

import { PostNotFoundError } from '../errors/post-not-found.error';
import { PostRepository } from '../post.repository';
import type { IPost } from '../post.entity';

@injectable()
export class GetPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<IPost> {
    const post = await this.postRepository.getById(id);

    if (!post) throw new PostNotFoundError(id);

    return post;
  }
}
