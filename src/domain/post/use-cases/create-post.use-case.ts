import type { ValidatorEntity } from '@domain/shared';
import type { ICreatePostInput } from '../post.repo';
import type { IPost } from '../post.entity';
import { PostRepository } from '../post.repo';

export class CreatePostUseCase {
  constructor(
    private postRepo: PostRepository,
    private validator: ValidatorEntity<ICreatePostInput>,
  ) {}

  async execute(payload: unknown): Promise<IPost> {
    const input = this.validator.validate(payload);
    return this.postRepo.create(input);
  }
}
