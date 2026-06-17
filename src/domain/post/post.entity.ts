import type { ValidatorEntity } from '@domain/shared/validator.entity';

export class PostEntity {
  constructor(
    public id: number,
    public idUser: number,
    public title: string,
    public content: string
  ) {}

  static create(
    input: unknown,
    validator: ValidatorEntity<PostEntity>
  ): PostEntity {
    return validator.validate(input);
  }
}

export type IPostEntity = PostEntity;


