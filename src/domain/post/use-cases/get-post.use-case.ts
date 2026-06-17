import { PostRepository } from '../post.repo';
import type { IPostEntity } from '../post.entity';

export class GetPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<IPostEntity> {
    return this.postRepository.getById(id);
  }
}
