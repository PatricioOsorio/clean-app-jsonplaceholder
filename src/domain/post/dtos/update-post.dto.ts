import type { ValidatorEntity } from '@domain/shared/validator.entity';
import type { IUpdatePostInput } from '../post.repo';

export class UpdatePostDto {
  static readonly VALIDATOR_TOKEN = Symbol('UpdatePostDto.Validator');

  private constructor(
    public readonly idUser: number,
    public readonly title: string,
    public readonly content: string,
  ) {}

  static create(props: unknown, validator: ValidatorEntity<IUpdatePostInput>): UpdatePostDto {
    const validated = validator.validate(props);
    return new UpdatePostDto(validated.idUser, validated.title, validated.content);
  }
}
