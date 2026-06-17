import { PostRepository } from '../post.repo';
import type { IPost } from '../post.entity';

export class GetPostsUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(): Promise<IPost[]> {
    return await this.postRepo.getAll();
  }
}
