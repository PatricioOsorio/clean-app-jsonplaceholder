import type { IValidatorEntity } from '@domain/shared/validator.entity';
import type { IPatchPostInput } from '../post.repo';

export class PatchPostDto {
  static readonly VALIDATOR_TOKEN = Symbol('PatchPostDto.Validator');

  private constructor(
    public readonly idUser?: number,
    public readonly title?: string,
    public readonly content?: string,
  ) {}

  static create(props: unknown, validator: IValidatorEntity<IPatchPostInput>): PatchPostDto {
    const validated = validator.validate(props);
    return new PatchPostDto(validated.idUser, validated.title, validated.content);
  }
}
