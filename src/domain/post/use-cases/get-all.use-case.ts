import { injectable } from 'tsyringe';
import { PostRepository } from '../post.repo';
import type { IPost } from '../post.entity';

@injectable()
export class GetAllUseCase {
  // constructor(@inject(PostRepository.TOKEN) private postRepo: PostRepository) {}
  constructor(private postRepo: PostRepository) {} // JS infers

  async execute(): Promise<IPost[]> {
    const posts = await this.postRepo.getAll();

    if (!posts) throw new Error('No posts found');

    if (posts.length === 0) throw new Error('No posts available');

    return posts;
  }
}
