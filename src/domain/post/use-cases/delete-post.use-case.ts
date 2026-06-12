import { injectable } from 'tsyringe';
import { PostRepository } from '../post.repo';
import { PostInvalidDataError } from '../errors/post-invalid-data.error';

@injectable()
export class DeletePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: number): Promise<boolean> {
    if (!id) throw new PostInvalidDataError('Post ID is required');

    const isDeleted = await this.postRepo.delete(id);

    return isDeleted;
  }
}
