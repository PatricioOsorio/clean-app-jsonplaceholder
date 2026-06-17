import { PostRepository } from '../post.repo';
import { PostInvalidDataError } from '../errors/post-invalid-data.error';

export class DeletePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: number): Promise<boolean> {
    if (id <= 0) throw new PostInvalidDataError('Post ID must be a positive number');

    const isDeleted = await this.postRepo.delete(id);

    return isDeleted;
  }
}
