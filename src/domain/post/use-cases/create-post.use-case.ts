import type { ValidatorEntity } from '@domain/shared';
import type { ICreatePostInput } from '../post.repo';
import type { IPostEntity } from '../post.entity';
import { PostRepository } from '../post.repo';

export class CreatePostUseCase {
  static readonly VALIDATOR_TOKEN = Symbol('CreatePostUseCase.Validator');

  constructor(
    private postRepo: PostRepository,
    private validator: ValidatorEntity<ICreatePostInput>,
  ) {}

  async execute(payload: ICreatePostInput): Promise<IPostEntity> {
    const input = this.validator.validate(payload);
    return this.postRepo.create(input);
  }
}
