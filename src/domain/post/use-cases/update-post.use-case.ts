import type { ValidatorEntity } from '@domain/shared';
import type { IUpdatePostInput } from '../post.repo';
import type { IPost } from '../post.entity';
import { PostRepository } from '../post.repo';

export class UpdatePostUseCase {
  static readonly VALIDATOR_TOKEN = Symbol('UpdatePostUseCase.Validator');

  constructor(
    private postRepo: PostRepository,
    private validator: ValidatorEntity<IUpdatePostInput>,
  ) {}

  async execute(id: number, payload: IUpdatePostInput): Promise<IPost> {
    const input = this.validator.validate(payload);
    return this.postRepo.update(id, input);
  }
}
