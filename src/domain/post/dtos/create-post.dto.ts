import type { ValidatorEntity } from '@domain/shared/validator.entity';
import type { ICreatePostInput } from '../post.repo';

export class CreatePostDto {
  static readonly VALIDATOR_TOKEN = Symbol('CreatePostDto.Validator');

  private constructor(
    public readonly idUser: number,
    public readonly title: string,
    public readonly content: string,
  ) {}

  static create(props: unknown, validator: ValidatorEntity<ICreatePostInput>): CreatePostDto {
    const validated = validator.validate(props);
    return new CreatePostDto(validated.idUser, validated.title, validated.content);
  }
}
