import type { ValidatorEntity } from '@domain/shared';
import { PostRepository, type IPatchPostInput } from '../post.repo';
import type { IPost } from '../post.entity';

export class PatchPostUseCase {
  constructor(
    private postRepo: PostRepository,
    private validator: ValidatorEntity<IPatchPostInput>,
  ) {}

  async execute(id: number, fields: unknown): Promise<IPost> {
    const input = this.validator.validate(fields);
    return this.postRepo.patch(id, input);
  }
}
