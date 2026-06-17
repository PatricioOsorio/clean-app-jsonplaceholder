import type { ValidatorEntity } from '@domain/shared';
import type { IPatchPostInput } from '../post.repo';
import type { IPostEntity } from '../post.entity';
import { PostRepository } from '../post.repo';

export class PatchPostUseCase {
  static readonly VALIDATOR_TOKEN = Symbol('PatchPostUseCase.Validator');

  constructor(
    private postRepo: PostRepository,
    private validator: ValidatorEntity<IPatchPostInput>,
  ) {}

  async execute(id: number, fields: IPatchPostInput): Promise<IPostEntity> {
    const input = this.validator.validate(fields);
    return this.postRepo.patch(id, input);
  }
}
