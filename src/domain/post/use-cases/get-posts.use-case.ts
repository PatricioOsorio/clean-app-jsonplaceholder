import { PostRepository } from '../post.repo';
import type { IPost } from '../post.entity';

export class GetPostsUseCase {
  // constructor(@inject(PostRepository.TOKEN) private postRepo: PostRepository) {}
  constructor(private postRepo: PostRepository) {} // JS infers

  async execute(): Promise<IPost[]> {
    const posts = await this.postRepo.getAll();

    return posts;
  }
}
