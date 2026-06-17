import { PostRepository } from '../post.repo';
import type { IPost } from '../post.entity';

export class GetPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<IPost> {
    return this.postRepository.getById(id);
  }
}
