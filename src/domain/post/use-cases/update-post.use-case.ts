import type { ValidatorEntity } from '@domain/shared';
import { PostRepository } from '../post.repo';
import type { IPost } from '../post.entity';
import type { IUpdatePostInput } from '../post.repo';

export class UpdatePostUseCase {
  constructor(
    private postRepo: PostRepository,
    private validator: ValidatorEntity<IUpdatePostInput>,
  ) {}

  async execute(id: number, payload: unknown): Promise<IPost> {
    const input = this.validator.validate(payload);
    return this.postRepo.update(id, input);
  }
}
