import { PostRepository } from '../post.repo';
import type { IPostEntity } from '../post.entity';

export class GetPostsUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(): Promise<IPostEntity[]> {
    return await this.postRepo.getAll();
  }
}
