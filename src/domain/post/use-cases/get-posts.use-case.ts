import { injectable } from 'tsyringe';
import { PostRepository } from '../post.repository';
import type { IPost } from '../post.entity';

@injectable()
export class GetPostsUseCase {
  // constructor(@inject(PostRepository.TOKEN) private postRepo: PostRepository) {}
  constructor(private postRepo: PostRepository) {} // JS infers

  async execute(): Promise<IPost[]> {
    const posts = await this.postRepo.getAll();

    return posts;
  }
}
